import express from 'express';
import movieObj from '../config/database.js';

const homeController = express.Router();

homeController.get('/', (req, res) => {
    res.render('home', movieObj);
});

homeController.get('/about', (req, res) => {
    res.render('about');
});

export default homeController;