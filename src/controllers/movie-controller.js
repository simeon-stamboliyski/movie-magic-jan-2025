import express from 'express';
import movieObj from '../config/database.js';
import movieService from '../services/movie-service.js';

const movieController = express.Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.get('/search', (req, res) => {
    res.render('search', movieObj);
});

movieController.get('/:movieId/details', (req, res) => {
    const movieId = req.params.movieId;
    let movie = movieService.findMovie(movieId);

    res.render('details', movie);
});

export default movieController;