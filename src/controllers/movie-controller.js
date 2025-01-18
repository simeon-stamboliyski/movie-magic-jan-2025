import express from 'express';
import movies from '../config/database.js';

const movieController = express.Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.get('/search', (req, res) => {
    res.render('search', movies);
});

export default movieController;