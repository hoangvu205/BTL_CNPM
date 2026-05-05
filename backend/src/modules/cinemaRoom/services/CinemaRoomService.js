const { CinemaRoomModel } = require('../models/CinemaRoomModel');

class CinemaRoomService {
    static async createRoom(data) {
        return await CinemaRoomModel.create(data);
    }

    static async getAllRooms() {
        return await CinemaRoomModel.findAll();
    }

    static async getRoomById(id) {
        return await CinemaRoomModel.findById(id);
    }

    static async updateRoom(id, data) {
        return await CinemaRoomModel.update(id, data);
    }

    static async deleteRoom(id) {
        return await CinemaRoomModel.delete(id);
    }
}

module.exports = CinemaRoomService;
