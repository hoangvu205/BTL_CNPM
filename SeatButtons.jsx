import React from 'react';

export default function SeatButton({ seat, isSelected, onToggle }) {
  const isBooked = seat.status === "booked";
  const isVip = seat.seat_type === "vip";

  let cls = "seat " + (isBooked ? "seat--booked" : isSelected ? "seat--selected" : "");
  if (isVip && !isBooked && !isSelected) cls += " seat--vip";

  return (
    <button
      className={cls}
      disabled={isBooked}
      onClick={() => onToggle(seat)}
      title={`${seat.seat_number} (${isVip ? 'VIP' : 'Thường'})`}
    />
  );
}