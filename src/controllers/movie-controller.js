import express from 'express';
import movieService from '../services/movie-service.js';

const movieController = express.Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', async (req, res) => {
    const newMovie = req.body;
    const userId = req.user?._id;
    console.log(userId);
    await movieService.createMovie(newMovie, userId);
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
    const isCreator = req.user && req.user._id.toString() === movie.creator.toString();

    res.render('details', { movie, isCreator });
});

export default movieController;