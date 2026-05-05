const { MovieModel } = require('../models/MovieModel');

class MovieService {
    static async createMovie(data) {
        return await MovieModel.create(data);
    }

    static async getAllMovies(filters) {
        return await MovieModel.findAll(filters);
    }

    static async getMovieById(id) {
        return await MovieModel.findById(id);
    }

    static async updateMovie(id, data) {
        return await MovieModel.update(id, data);
    }

    static async deleteMovie(id) {
        return await MovieModel.delete(id);
    }
}

module.exports = MovieService;
