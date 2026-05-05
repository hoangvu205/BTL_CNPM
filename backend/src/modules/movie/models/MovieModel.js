const { conn } = require('../../../config/dbConnect');

class Movie {
    constructor({ id, title, description, duration, release_date, genre, poster_url, status }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.duration = duration;
        this.release_date = release_date;
        this.genre = genre;
        this.poster_url = poster_url;
        this.status = status;
    }
}
class MovieModel {
    static async create(movieData) {
        const { title, description, duration, release_date, genre, poster_url, status } = movieData;
        const query = `INSERT INTO movies (title, description, duration, release_date, genre, poster_url, status) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await conn.execute(query, [title, description, duration, release_date, genre, poster_url, status]);
        return result;
    }

    static async findAll(filters) {
        let query = `SELECT * FROM movies WHERE 1=1`;
        const params = [];

        if (filters.search) {
            query += ` AND title LIKE ?`;
            params.push(`%${filters.search}%`);
        }
        if (filters.status) {
            query += ` AND status = ?`;
            params.push(filters.status);
        }
        if (filters.genre) {
            query += ` AND genre = ?`;
            params.push(filters.genre);
        }

        const [rows] = await conn.execute(query, params);
        return rows.map(row => new Movie(row));
    }

    static async findById(id) {
        const query = `SELECT * FROM movies WHERE id = ?`;
        const [rows] = await conn.execute(query, [id]);
        return rows[0] ? new Movie(rows[0]) : null;
    }

    static async update(id, movieData) {
        const { title, description, duration, release_date, genre, poster_url, status } = movieData;
        const query = `UPDATE movies SET title=?, description=?, duration=?, release_date=?, genre=?, poster_url=?, status=? WHERE id=?`;
        const [result] = await conn.execute(query, [title, description, duration, release_date, genre, poster_url, status, id]);
        return result;
    }

    static async delete(id) {
        const query = `DELETE FROM movies WHERE id = ?`;
        const [result] = await conn.execute(query, [id]);
        return result;
    }
}

module.exports = { Movie, MovieModel };
