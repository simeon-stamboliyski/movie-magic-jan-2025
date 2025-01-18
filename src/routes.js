import express from 'express';
import homeRouter from './controllers/home-controller.js';

const router = express.Router();

router.use(homeRouter);

export default router;