const db = require('../../../config/db'); // Đường dẫn tới file kết nối database

// --- Lấy danh sách ghế ---
exports.getSeatsByShowtime = async (req, res) => {
  const showtimeId = parseInt(req.params.id);
  if (isNaN(showtimeId)) {
    return res.status(400).json({ success: false, message: 'ID suất chiếu không hợp lệ.' });
  }

  try {
    const [showtimeRows] = await db.query(
      `SELECT st.id, st.start_time, st.price, m.title AS movie_title, cr.name AS room_name
       FROM showtimes st
       JOIN movies m ON st.movie_id = m.id
       JOIN cinema_rooms cr ON st.room_id = cr.id
       WHERE st.id = ?`, [showtimeId]
    );

    if (showtimeRows.length === 0) {
      return res.status(404).json({ success: false, message: 'Suất chiếu không tồn tại.' });
    }

    const [seats] = await db.query(
      `SELECT s.id, s.seat_number, s.seat_type,
         CASE WHEN bs.seat_id IS NOT NULL THEN 'booked' ELSE 'available' END AS status
       FROM seats s
       JOIN cinema_rooms cr ON s.room_id = cr.id
       JOIN showtimes st ON st.room_id = cr.id
       LEFT JOIN booking_seats bs ON bs.seat_id = s.id AND bs.showtime_id = st.id
       LEFT JOIN bookings b ON b.id = bs.booking_id AND b.status != 'cancelled'
       WHERE st.id = ? ORDER BY s.seat_number`, [showtimeId]
    );

    return res.json({ success: true, showtime: showtimeRows[0], seats });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi server nội bộ.' });
  }
};

// --- Xử lý Đặt vé ---
exports.createBooking = async (req, res) => {
  const { user_id, showtime_id, seat_ids } = req.body;
  if (!user_id || !showtime_id || !Array.isArray(seat_ids) || seat_ids.length === 0) {
    return res.status(400).json({ success: false, message: 'Thiếu thông tin đặt vé.' });
  }

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // Kiểm tra ghế trống và khóa hàng (FOR UPDATE)
    const placeholders = seat_ids.map(() => '?').join(', ');
    const [alreadyBooked] = await conn.query(
      `SELECT bs.seat_id FROM booking_seats bs JOIN bookings b ON b.id = bs.booking_id
       WHERE bs.seat_id IN (${placeholders}) AND bs.showtime_id = ? AND b.status != 'cancelled' FOR UPDATE`,
      [...seat_ids, showtime_id]
    );

    if (alreadyBooked.length > 0) {
      await conn.rollback();
      return res.status(409).json({ success: false, message: 'Ghế đã có người đặt.' });
    }

    // Tính tiền và chèn dữ liệu (giữ nguyên logic từ file bookings.js)
    const [priceRows] = await conn.query('SELECT price FROM showtimes WHERE id = ?', [showtime_id]);
    const totalAmount = parseFloat(priceRows[0].price) * seat_ids.length;

    const [bookingResult] = await conn.query(
      `INSERT INTO bookings (user_id, showtime_id, status) VALUES (?, ?, 'pending')`, [user_id, showtime_id]
    );

    const bookingId = bookingResult.insertId;
    const bookingSeatValues = seat_ids.map((seatId) => [bookingId, seatId, showtime_id]);
    await conn.query(`INSERT INTO booking_seats (booking_id, seat_id, showtime_id) VALUES ?`, [bookingSeatValues]);

    await conn.commit();
    res.status(201).json({ success: true, data: { booking_id: bookingId, total_amount: totalAmount } });
  } catch (error) {
    await conn.rollback();
    res.status(500).json({ success: false, message: 'Lỗi khi đặt vé.' });
  } finally {
    conn.release();
  }
};