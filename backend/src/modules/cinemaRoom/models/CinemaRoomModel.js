const { conn } = require('../../../config/dbConnect');

class CinemaRoom {
    constructor({ id, name, total_seats }) {
        this.id = id;
        this.name = name;
        this.total_seats = total_seats;
    }
}
class CinemaRoomModel {
    static async create(roomData) {
        const { name, total_seats } = roomData;
        const query = `INSERT INTO cinema_rooms (name, total_seats) VALUES (?, ?)`;
        const [result] = await conn.execute(query, [name, total_seats]);
        return result;
    }

    static async findAll() {
        const query = `SELECT * FROM cinema_rooms`;
        const [rows] = await conn.execute(query);
        return rows.map(row => new CinemaRoom(row));
    }

    static async findById(id) {
        const query = `SELECT * FROM cinema_rooms WHERE id = ?`;
        const [rows] = await conn.execute(query, [id]);
        return rows[0] ? new CinemaRoom(rows[0]) : null;
    }

    static async update(id, roomData) {
        const { name, total_seats } = roomData;
        const query = `UPDATE cinema_rooms SET name=?, total_seats=? WHERE id=?`;
        const [result] = await conn.execute(query, [name, total_seats, id]);
        return result;
    }

    static async delete(id) {
        const query = `DELETE FROM cinema_rooms WHERE id = ?`;
        const [result] = await conn.execute(query, [id]);
        return result;
    }
}

module.exports = { CinemaRoom, CinemaRoomModel };
