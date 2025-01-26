import express from 'express';
import homeRouter from './controllers/home-controller.js';
import movieRouter from './controllers/movie-controller.js';
import castRouter from './controllers/cast-controller.js';

const router = express.Router();

router.use(homeRouter);

router.use('/movies', movieRouter);

router.use('/casts', castRouter);

router.get('*', (req, res) => {
    res.render('404');
});

export default router;