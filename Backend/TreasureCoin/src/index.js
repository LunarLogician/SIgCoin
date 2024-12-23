// server.js
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import authRoutes from '../routes/authRoutes.js';
import miningRoutes from '../routes/miningRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

dotenv.config();
const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views')); // Use process.cwd() for dynamic path resolution

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

app.use(express.static(path.join(process.cwd(), 'public')));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', miningRoutes);



// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something went wrong!' });
});

app.get('/', (req, res) => {
    res.render('User');
});

// Start server
const PORT =  5000; // Use environment variable or fallback to 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed.');
        process.exit(0);
    });
});
