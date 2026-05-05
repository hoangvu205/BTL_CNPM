const MovieService = require('../services/MovieService');

class MovieController {
    static async create(req, res) {
        try {
            await MovieService.createMovie(req.body);
            res.status(201).json({ success: true, message: "Movie created successfully" });
        } catch (error) {
            console.error("Create movie error:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    static async getAll(req, res) {
        try {
            const filters = {
                search: req.query.search,
                status: req.query.status,
                genre: req.query.genre
            };
            const movies = await MovieService.getAllMovies(filters);
            res.status(200).json({ success: true, data: movies });
        } catch (error) {
            console.error("Get movies error:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    static async getById(req, res) {
        try {
            const movie = await MovieService.getMovieById(req.params.id);
            if (!movie) return res.status(404).json({ success: false, message: "Movie not found" });
            res.status(200).json({ success: true, data: movie });
        } catch (error) {
            console.error("Get movie error:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    static async update(req, res) {
        try {
            await MovieService.updateMovie(req.params.id, req.body);
            res.status(200).json({ success: true, message: "Movie updated successfully" });
        } catch (error) {
            console.error("Update movie error:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    static async delete(req, res) {
        try {
            await MovieService.deleteMovie(req.params.id);
            res.status(200).json({ success: true, message: "Movie deleted successfully" });
        } catch (error) {
            console.error("Delete movie error:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
}

module.exports = MovieController;
