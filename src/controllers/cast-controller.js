import { Router } from 'express';
import castService from '../services/cast-service.js';
import movieService from '../services/movie-service.js';

const router = Router();

router.get('/create', (req, res) => {
    res.render('casts/create');
});

router.post('/create', (req, res) => {
    let castData = req.body;
    console.log(castData);
    castService.create(castData);
    
    res.redirect('/');
});

router.get('/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;
    let movie = await movieService.findMovie(movieId);
    const casts = Array.from(await castService.getAll({exclude: movie.casts}).lean()).map(cast => ({
            ...cast,
            _id: cast._id.toString()
        }));
    console.log(casts);

    res.render('casts/attach', { movie, casts: casts }); 
});

router.post('/:movieId/attach', async (req, res) => {
    const castId = req.body.cast
    const movieId = req.params.movieId
    castService.attach(movieId, castId);

    res.redirect('/');
});

export default router;