import express from 'express';
import homeRouter from './controllers/home-controller.js';
import movieRouter from './controllers/movie-controller.js';

const router = express.Router();

router.use(homeRouter);

router.use('/movies', movieRouter)

router.get('*', (req, res) => {
    res.render('404');
});

export default router;