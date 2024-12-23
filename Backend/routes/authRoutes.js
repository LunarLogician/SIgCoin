import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json()); 

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
console.log(process.env.JWT_SECRET);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 1000, // 1 hour
        });

        return res.status(201).json({ success: true, message: 'Registration successful ZUbair' , key1: token});
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ success: false, message: 'Invalid username or password' });
        }

        const token = jwt.sign({ userId: user._id , username:user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 1000, // 1 hour
        });
        const decodedToken = jwt.decode(token);
console.log('Decoded token payload:', decodedToken);


        return res.status(201).json({ success: true, message: 'Registration successful ZUbair' , key1: token});

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ sat:false, message: 'Internal server error' });
    }
});

export default router;
