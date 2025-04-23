import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
export const login = async (req, res) => {
    // TODO: If the user exists and the password is correct, return a JWT token
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
        res.status(401).json({ message: 'Invalid username or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET_KEY || "", {
        expiresIn: '1h', // Token expiration time
    });
    res.json({ token });
};
const router = Router();
// POST /login - Login a user
router.post('/login', login);
export default router;
