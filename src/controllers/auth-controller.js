import { Router } from "express";
import authService from "../services/auth-service.js";

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register');
});

authController.post('/register', async (req, res) => {
    const userData = req.body;

    await authService.register(userData);

    res.redirect('/auth/login');
});

authController.get('/login', (req, res) => {
    res.render('auth/login');
});

authController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        await authService.login(email, password);
        return res.redirect('/');
    }
    catch (err) { 
        console.log(err.message); 
        return res.redirect('/404'); 
    }
});

export default authController;