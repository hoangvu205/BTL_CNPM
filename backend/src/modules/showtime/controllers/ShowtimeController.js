const ShowtimeService = require('../services/ShowtimeService');

class ShowtimeController {
    static async create(req, res) {
        try {
            await ShowtimeService.createShowtime(req.body);
            res.status(201).json({ success: true, message: "Showtime created successfully" });
        } catch (error) {
            console.error("Create showtime error:", error);
            res.status(400).json({ success: false, message: error.message || "Internal server error" });
        }
    }

    static async getAll(req, res) {
        try {
            const showtimes = await ShowtimeService.getAllShowtimes();
            res.status(200).json({ success: true, data: showtimes });
        } catch (error) {
            console.error("Get showtimes error:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    static async getById(req, res) {
        try {
            const showtime = await ShowtimeService.getShowtimeById(req.params.id);
            if (!showtime) return res.status(404).json({ success: false, message: "Showtime not found" });
            res.status(200).json({ success: true, data: showtime });
        } catch (error) {
            console.error("Get showtime error:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    static async update(req, res) {
        try {
            await ShowtimeService.updateShowtime(req.params.id, req.body);
            res.status(200).json({ success: true, message: "Showtime updated successfully" });
        } catch (error) {
            console.error("Update showtime error:", error);
            res.status(400).json({ success: false, message: error.message || "Internal server error" });
        }
    }

    static async delete(req, res) {
        try {
            await ShowtimeService.deleteShowtime(req.params.id);
            res.status(200).json({ success: true, message: "Showtime deleted successfully" });
        } catch (error) {
            console.error("Delete showtime error:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
}

module.exports = ShowtimeController;
