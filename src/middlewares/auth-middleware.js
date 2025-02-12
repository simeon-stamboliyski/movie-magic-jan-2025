import jwt from "jsonwebtoken";
import authService from "../services/auth-service.js";

const secretKey = authService.secretKey;

export const authMiddleWare = (req, res, next) => {
    const token = req.cookies['auth'];

    if (!token) {
        return next();
    }
    
    try {
        const decodedToken = jwt.verify(token, secretKey);
        req.user = decodedToken;

        next();
    } catch(err) {
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }
}