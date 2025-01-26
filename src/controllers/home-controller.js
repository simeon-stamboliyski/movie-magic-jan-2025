import express from 'express';
import movieService from '../services/movie-service.js';

const homeController = express.Router();

homeController.get('/', async (req, res) => {
    const movies = await movieService.getAll().lean();
    res.render('home', { movies: movies });
});

homeController.get('/about', (req, res) => {
    res.render('about');
});

export default homeController;