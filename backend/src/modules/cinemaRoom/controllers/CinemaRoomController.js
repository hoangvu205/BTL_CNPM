const CinemaRoomService = require('../services/CinemaRoomService');

class CinemaRoomController {
    static async create(req, res) {
        try {
            await CinemaRoomService.createRoom(req.body);
            res.status(201).json({ success: true, message: "Room created successfully" });
        } catch (error) {
            console.error("Create room error:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    static async getAll(req, res) {
        try {
            const rooms = await CinemaRoomService.getAllRooms();
            res.status(200).json({ success: true, data: rooms });
        } catch (error) {
            console.error("Get rooms error:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    static async getById(req, res) {
        try {
            const room = await CinemaRoomService.getRoomById(req.params.id);
            if (!room) return res.status(404).json({ success: false, message: "Room not found" });
            res.status(200).json({ success: true, data: room });
        } catch (error) {
            console.error("Get room error:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    static async update(req, res) {
        try {
            await CinemaRoomService.updateRoom(req.params.id, req.body);
            res.status(200).json({ success: true, message: "Room updated successfully" });
        } catch (error) {
            console.error("Update room error:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    static async delete(req, res) {
        try {
            await CinemaRoomService.deleteRoom(req.params.id);
            res.status(200).json({ success: true, message: "Room deleted successfully" });
        } catch (error) {
            console.error("Delete room error:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
}

module.exports = CinemaRoomController;
