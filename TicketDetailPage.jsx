import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TicketCard from '../components/Ticket/TicketCard';

export default function TicketDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Dữ liệu vé được truyền từ trang đặt vé sau khi thành công
  const ticketData = location.state?.ticket;

  if (!ticketData) {
    return (
      <div className="error-page">
        <p>Không tìm thấy thông tin vé.</p>
        <button onClick={() => navigate('/')}>Quay lại trang chủ</button>
      </div>
    );
  }

  return (
    <div className="ticket-detail-page">
      <h1>Đặt vé thành công!</h1>
      <TicketCard ticketData={ticketData} />
      <button className="btn-history" onClick={() => navigate('/history')}>
        Xem lịch sử đặt vé
      </button>
    </div>
  );
}