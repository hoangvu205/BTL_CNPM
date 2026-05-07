import React from 'react';

export default function SeatLegend() {
  const legends = [
    { label: "Trống", class: "" },
    { label: "Đang chọn", class: "seat--selected" },
    { label: "Đã đặt", class: "seat--booked" },
    { label: "VIP", class: "seat--vip" },
  ];

  return (
    <div className="legend">
      {legends.map((item, idx) => (
        <div key={idx} className="legend__item">
          <div className={`seat ${item.class}`} style={{ cursor: 'default' }}></div>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}