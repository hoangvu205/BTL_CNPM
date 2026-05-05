const { ShowtimeModel } = require('../models/ShowtimeModel');
const { MovieModel } = require('../../movie/models/MovieModel');

class ShowtimeService {
    static async validateOverlap(room_id, new_start_time, new_movie_id, exclude_showtime_id = null) {
        const newStartTime = new Date(new_start_time);
        const movie = await MovieModel.findById(new_movie_id);
        if (!movie) throw new Error("Movie not found");

        const newDuration = movie.duration; // in minutes
        const newEndTime = new Date(newStartTime.getTime() + newDuration * 60000);

        const existingShowtimes = await ShowtimeModel.findByRoomId(room_id);

        for (const st of existingShowtimes) {
            if (exclude_showtime_id && st.id == exclude_showtime_id) continue;

            const existingStart = new Date(st.start_time);
            const existingEnd = new Date(existingStart.getTime() + st.movie.duration * 60000);

            // Time overlap condition: (StartA < EndB) and (EndA > StartB)
            if (newStartTime < existingEnd && newEndTime > existingStart) {
                return false; // Overlap detected
            }
        }
        return true; // No overlap
    }

    static async createShowtime(data) {
        const { room_id, start_time, movie_id } = data;
        const isValid = await this.validateOverlap(room_id, start_time, movie_id);
        if (!isValid) throw new Error("Showtime overlaps with an existing one in this room.");
        return await ShowtimeModel.create(data);
    }

    static async getAllShowtimes() {
        return await ShowtimeModel.findAll();
    }

    static async getShowtimeById(id) {
        return await ShowtimeModel.findById(id);
    }

    static async updateShowtime(id, data) {
        const { room_id, start_time, movie_id } = data;
        const isValid = await this.validateOverlap(room_id, start_time, movie_id, id);
        if (!isValid) throw new Error("Showtime overlaps with an existing one in this room.");
        return await ShowtimeModel.update(id, data);
    }

    static async deleteShowtime(id) {
        return await ShowtimeModel.delete(id);
    }
}

module.exports = ShowtimeService;
