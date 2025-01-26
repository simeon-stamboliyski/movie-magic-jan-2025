import express from 'express';
import movieService from '../services/movie-service.js';

const movieController = express.Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', async (req, res) => {
    await movieService.createMovie(req.body);
    res.redirect('/');
});

movieController.get('/search', async (req, res) => {
    let filter = req.query;
    const movies = await movieService.getAll(filter).lean();
    res.render('search', { movies, filter });
});

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;
    let movie = await movieService.findMovie(movieId);

    res.render('details', movie);
});

export default movieController;