import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKey = 'jdoe93h4nd9d4j4b2672i4jdnd';

function validateForm(email, password) {
    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    function validatePassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);

    if (!emailValid || !passwordValid) {
        return false;
    }

    return true;
}

export default {
    async register(userData) {
        if (!validateForm(userData.email, userData.password)) {
            throw new Error("Invalid email format or password is not strong enough.");
        }
        if (userData.password !== userData.rePassword) {
            throw new Error("Repeated password does not match");
        }
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
            _id: User._id,
            email: User.email
        };

        const token = jwt.sign(payload, secretKey, { expiresIn: '2h' });

        return token;
    },
    secretKey
}