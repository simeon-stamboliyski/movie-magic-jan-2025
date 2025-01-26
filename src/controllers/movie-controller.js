import express from 'express';
import movieService from '../services/movie-service.js';

const movieController = express.Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', (req, res) => {
    movieService.createMovie(req.body);
    res.redirect('/');
});

movieController.get('/search', (req, res) => {
    let filter = req.query;
    const movies = movieService.getAll(filter);
    res.render('search', { movies, filter });
});

movieController.get('/:movieId/details', (req, res) => {
    const movieId = req.params.movieId;
    let movie = movieService.findMovie(movieId);

    res.render('details', movie);
});

export default movieController;