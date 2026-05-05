CREATE DATABASE IF NOT EXISTS movie_booking;
USE movie_booking;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('customer', 'staff', 'admin') DEFAULT 'customer'
);
CREATE TABLE movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration INT,
    release_date DATE,
    genre VARCHAR(100),
    poster_url VARCHAR(255),
    status VARCHAR(50)
);
CREATE TABLE cinema_rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    total_seats INT
);
CREATE TABLE seats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_id INT,
    seat_number VARCHAR(10),
    seat_type ENUM('normal', 'vip') DEFAULT 'normal',

    FOREIGN KEY (room_id) REFERENCES cinema_rooms(id)
        ON DELETE CASCADE
);
CREATE TABLE showtimes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT,
    room_id INT,
    start_time DATETIME,
    price DECIMAL(10,2),

    FOREIGN KEY (movie_id) REFERENCES movies(id)
        ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES cinema_rooms(id)
        ON DELETE CASCADE
);
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    showtime_id INT,
    status ENUM('pending', 'paid', 'cancelled') DEFAULT 'pending',

    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,
    FOREIGN KEY (showtime_id) REFERENCES showtimes(id)
        ON DELETE CASCADE
);
CREATE TABLE booking_seats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT,
    seat_id INT,
    showtime_id INT,

    FOREIGN KEY (booking_id) REFERENCES bookings(id)
        ON DELETE CASCADE,
    FOREIGN KEY (seat_id) REFERENCES seats(id)
        ON DELETE CASCADE,
    FOREIGN KEY (showtime_id) REFERENCES showtimes(id)
        ON DELETE CASCADE,

    UNIQUE (seat_id, showtime_id) -- chống trùng ghế
);
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT,
    amount DECIMAL(10,2),
    method VARCHAR(50),
    status ENUM('pending', 'success', 'failed') DEFAULT 'pending',
    paid_at TIMESTAMP NULL,

    FOREIGN KEY (booking_id) REFERENCES bookings(id)
        ON DELETE CASCADE
);
CREATE INDEX idx_movie_title ON movies(title);
CREATE INDEX idx_showtime_movie ON showtimes(movie_id);
CREATE INDEX idx_booking_user ON bookings(user_id);