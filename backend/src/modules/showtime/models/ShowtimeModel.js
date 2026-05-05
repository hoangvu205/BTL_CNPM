const { conn } = require('../../../config/dbConnect');

const { Movie } = require('../../movie/models/MovieModel');
const { CinemaRoom } = require('../../cinemaRoom/models/CinemaRoomModel');

class Showtime {
    constructor({ id, movie, room, start_time, price }) {
        this.id = id;
        this.movie = movie;
        this.room = room;
        this.start_time = start_time;
        this.price = price;
    }
}
class ShowtimeModel {
    static async create(showtimeData) {
        const { movie_id, room_id, start_time, price } = showtimeData;
        const query = `INSERT INTO showtimes (movie_id, room_id, start_time, price) VALUES (?, ?, ?, ?)`;
        const [result] = await conn.execute(query, [movie_id, room_id, start_time, price]);
        return result;
    }

    static async findAll() {
        const query = `
            SELECT s.*, m.title as movie_title, m.duration, r.name as room_name 
            FROM showtimes s
            JOIN movies m ON s.movie_id = m.id
            JOIN cinema_rooms r ON s.room_id = r.id
            ORDER BY s.start_time DESC
        `;
        const [rows] = await conn.execute(query);
        return rows.map(row => new Showtime({
            id: row.id,
            start_time: row.start_time,
            price: row.price,
            movie: new Movie({ id: row.movie_id, title: row.movie_title, duration: row.duration }),
            room: new CinemaRoom({ id: row.room_id, name: row.room_name })
        }));
    }

    static async findById(id) {
        const query = `
            SELECT s.*, m.title as movie_title, m.duration, r.name as room_name 
            FROM showtimes s
            JOIN movies m ON s.movie_id = m.id
            JOIN cinema_rooms r ON s.room_id = r.id
            WHERE s.id = ?
        `;
        const [rows] = await conn.execute(query, [id]);
        return rows[0] ? new Showtime({
            id: rows[0].id,
            start_time: rows[0].start_time,
            price: rows[0].price,
            movie: new Movie({ id: rows[0].movie_id, title: rows[0].movie_title, duration: rows[0].duration }),
            room: new CinemaRoom({ id: rows[0].room_id, name: rows[0].room_name })
        }) : null;
    }

    static async findByRoomId(room_id) {
        const query = `
            SELECT s.*, m.duration 
            FROM showtimes s
            JOIN movies m ON s.movie_id = m.id
            WHERE s.room_id = ?
        `;
        const [rows] = await conn.execute(query, [room_id]);
        return rows.map(row => new Showtime({
            id: row.id,
            start_time: row.start_time,
            price: row.price,
            movie: new Movie({ id: row.movie_id, duration: row.duration }),
            room: new CinemaRoom({ id: row.room_id })
        }));
    }

    static async update(id, showtimeData) {
        const { movie_id, room_id, start_time, price } = showtimeData;
        const query = `UPDATE showtimes SET movie_id=?, room_id=?, start_time=?, price=? WHERE id=?`;
        const [result] = await conn.execute(query, [movie_id, room_id, start_time, price, id]);
        return result;
    }

    static async delete(id) {
        const query = `DELETE FROM showtimes WHERE id = ?`;
        const [result] = await conn.execute(query, [id]);
        return result;
    }
}

module.exports = { Showtime, ShowtimeModel };
