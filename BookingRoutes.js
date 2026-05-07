const express = require('express');
const router = express.Router();
// Import controller (Lưu ý: Bạn sẽ tạo file này ở bước tiếp theo)
const bookingController = require('../controllers/bookingController');

/**
 * @route   GET /api/bookings/showtimes/:id/seats
 * @desc    Lấy sơ đồ ghế của một suất chiếu
 */
router.get('/showtimes/:id/seats', bookingController.getSeatsByShowtime);

/**
 * @route   POST /api/bookings
 * @desc    Thực hiện đặt vé (tạo đơn hàng và giữ ghế)
 */
router.post('/', bookingController.createBooking);

module.exports = router;