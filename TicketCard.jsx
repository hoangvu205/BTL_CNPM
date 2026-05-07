import React from 'react';

export default function TicketCard({ ticketData }) {
  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <h2>VÉ XEM PHIM</h2>
        <span className="ticket-code">Mã: {ticketData.ticketCode}</span>
      </div>
      <div className="ticket-body">
        <h3>{ticketData.movieTitle}</h3>
        <p>Rạp: {ticketData.roomName}</p>
        <p>Suất chiếu: {new Date(ticketData.startTime).toLocaleString('vi-VN')}</p>
        <p>Ghế: {ticketData.seats.join(', ')}</p>
      </div>
      <div className="ticket-footer">
        <p>Vui lòng đưa mã này cho nhân viên để nhận vé.</p>
      </div>
    </div>
  );
}