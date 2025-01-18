import express from 'express';
import movies from '../config/database.js';

const homeController = express.Router();

homeController.get('/', (req, res) => {
    res.render('home', movies);
});

homeController.get('/about', (req, res) => {
    res.render('about');
});

export default homeController;