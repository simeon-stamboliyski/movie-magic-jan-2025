import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKey = 'jdoe93h4nd9d4j4b2672i4jdnd';

export default {
    register(userData) {
        return User.create(userData);
    },
    async login(email, password) {
        const user = await User.findOne({ email }); 

        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            throw new Error('Invalid email or password');
        }

        const payload = {
            _id: user._id,
            email: User.email
        };

        const token = jwt.sign(payload, secretKey, { expiresIn: '2h' });

        return token;
    },
    secretKey
}