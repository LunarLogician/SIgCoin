import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import authRoutes from '../routes/authRoutes.js';
import miningRoutes from '../routes/miningRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'; 
import path from 'path';

dotenv.config(); // Load environment variables from .env file

const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, 
}));
app.use(cookieParser()); // Add cookie-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', miningRoutes);

// MongoDB Connection
const mongoURL = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/treasure_coin'; // Use environment variable or fallback to local DB
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something went wrong!' });
});

// Home Route
app.get('/api/home', (req, res) => {
    const homeData = {
        title: "Welcome to the Home Page",
        message: "This is the home page content.",
    };
    res.json(homeData); // Send data as JSON
});

// Render EJS Views
app.get('/', (req, res) => {
    res.render('User'); // Render the home EJS file
});
app.get('/register', (req, res) => {
    res.render('register'); // Render the registration EJS file
});
app.get('/login', (req, res) => {
    res.render('login'); // Render the login EJS file
});

// Registration Logic
app.post('/api/auth/register', async (req, res) => {
    const { username, password } = req.body;
    // Add your registration logic (e.g., check for existing users, hash passwords, save user to DB)
});

// Login Logic
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    // Add your login logic (e.g., verify credentials, generate JWT, return response)
});

// Start Server
const PORT = process.env.PORT || 5000; // Use environment variable or fallback to 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Graceful Shutdown
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed.');
        process.exit(0);
    });
});


export default app;
