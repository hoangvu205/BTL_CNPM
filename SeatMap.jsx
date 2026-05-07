export default function SeatMap({ seats, onSeatClick }) {
    return (
        <div className="grid">
            {seats.map(seat => (
                <button 
                   className={`seat ${seat.status} ${seat.type}`}
                   onClick={() => onSeatClick(seat)}
                >
                   {seat.seat_number}
                </button>
            ))}
        </div>
    );
}