import { useState, useEffect } from "react";
import SeatButton from "../components/Seat/SeatButton";
import SeatLegend from "../components/Seat/SeatLegend";
import BookingSummary from "../components/Seat/BookingSummary";
import "./SeatSelection.css";

const SeatSelectionPage = () => {
  const [seats, setSeats] = useState([]);
  const [showtime, setShowtime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Fetch dữ liệu từ Backend (giữ nguyên logic fetch cũ của bạn)
  
  const toggleSeat = (seat) => {
    setSelectedSeats(prev => 
      prev.find(s => s.id === seat.id) 
        ? prev.filter(s => s.id !== seat.id) 
        : [...prev, seat]
    );
  };

  return (
    <div className="seat-selection-container">
      <div className="screen"></div>
      <div className="seating-grid">
        {/* Render danh sách ghế ở đây */}
        {seats.map(seat => (
          <SeatButton 
            key={seat.id} 
            seat={seat} 
            isSelected={selectedSeats.some(s => s.id === seat.id)}
            onToggle={toggleSeat} 
          />
        ))}
      </div>
      <SeatLegend />
      <BookingSummary 
        selectedSeats={selectedSeats} 
        showtime={showtime} 
        onBooking={() => {/* Gọi API đặt vé */}}
      />
    </div>
  );
};

export default SeatSelectionPage;