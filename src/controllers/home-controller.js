import express from 'express';
import movieService from '../services/movie-service.js';

const homeController = express.Router();

homeController.get('/', async (req, res) => {
    const movies = Array.from(await movieService.getAll().lean()).map(movie => ({
        ...movie,
        _id: movie._id.toString()
    }));
    res.render('home', { movies });
});

homeController.get('/about', (req, res) => {
    res.render('about');
});

export default homeController;