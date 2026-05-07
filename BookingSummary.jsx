import React from 'react';

export default function BookingSummary({ selectedSeats, showtime, onBooking, loading }) {
  const totalPrice = selectedSeats.length * (showtime?.price || 0);

  const formatCurrency = (amount) => 
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);

  return (
    <div className="booking-summary">
      <div className="booking-summary__info">
        <p>Phim: <strong>{showtime?.movie_title}</strong></p>
        <p>Ghế đã chọn: 
          <strong> {selectedSeats.map(s => s.seat_number).join(', ') || 'Chưa chọn'}</strong>
        </p>
        <h3 className="booking-summary__total">Tổng tiền: {formatCurrency(totalPrice)}</h3>
      </div>
      <button 
        className="btn btn--primary" 
        disabled={selectedSeats.length === 0 || loading}
        onClick={onBooking}
      >
        {loading ? 'Đang xử lý...' : 'Xác nhận đặt vé'}
      </button>
    </div>
  );
}