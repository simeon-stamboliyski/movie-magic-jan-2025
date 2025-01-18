import express from 'express';

const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
    res.render('home');
});

homeRouter.get('/about', (req, res) => {
    res.render('about');
});

homeRouter.get('/create', (req, res) => {
    res.render('create');
});

homeRouter.get('/search', (req, res) => {
    res.render('search');
});

homeRouter.get('*', (req, res) => {
    res.render('404');
});

export default homeRouter;