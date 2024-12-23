import express from 'express';
import jwt from 'jsonwebtoken';
import MiningSession from '../models/MiningSession.js';

const router = express.Router();

const authenticateToken = (req, res, next) => {
    const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzBlNGU5YzM3MDZiMjA0OThlMjllMzciLCJpYXQiOjE3MjkwOTk0ODMsImV4cCI6MTcyOTEwMzA4M30.8Kx_Nj9TnPbtXLe3JyzAUY5K4ZOWieaFuS0YGkDp0fU"
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        console.log(token)
        req.user = user;
        next();
    });
};

// New route to start a mining session
router.post('/mining/start', authenticateToken, async (req, res) => {
    const existingSession = await MiningSession.findOne({ userId: req.user.userId, isMining: true });
    
    if (existingSession) {
        return res.status(400).json({ message: 'There is already an active mining session.' });
    }

    const newSession = new MiningSession({
        userId: req.user.userId,
        startTime: Date.now(),
        isMining: true,
        coinsMined: 0
    });

    await newSession.save();
    res.json({ message: 'Mining session started', session: newSession });
});

// Route to check mining session status
// Route to check mining session status
router.get('/mining/status', authenticateToken, async (req, res) => {
    const session = await MiningSession.findOne({ userId: req.user.userId, isMining: true });
    
    let miningDuration = 0; // Default duration is 0
    let coinsEarned = 0; // Default coins earned is 0

    if (session) {
        // Calculate the mining duration in seconds
        const currentTime = Date.now();
        miningDuration = Math.floor((currentTime - session.startTime) / 1000); // in seconds
        
        // Calculate coins earned: 0.1 coins for each full hour
        const hoursMined = Math.floor(miningDuration / 3600); // Calculate full hours mined
        coinsEarned = (hoursMined * 0.1).toFixed(1); // Format to 1 decimal place
    }
    
    // Render the status.ejs view with the session data, mining duration, and coins earned
    res.render('status', { session, miningDuration, coinsEarned });
});


/// Change to POST to complete a mining session
// Change to POST to complete a mining session
router.post('/mining/complete', authenticateToken, async (req, res) => {
    const session = await MiningSession.findOne({ userId: req.user.userId, isMining: true });

    if (session) {
        session.isMining = false;
        session.endTime = Date.now();

        // Calculate the mining duration in seconds
        const miningDuration = (session.endTime - session.startTime) / 1000; // duration in seconds
        
        // Calculate coins earned based on mining duration (0.1 coin per hour)
        const hoursMined = miningDuration / 3600; // Convert seconds to hours
        const coinsEarned = hoursMined * 0.1; // Calculate coins earned

        session.coinsMined += coinsEarned; // Add earned coins to the total
        session.coinsMined = Math.max(0, session.coinsMined); // Ensure coins mined is not negative

        await session.save();
        
        // Redirect to the complete page to show the results
        return res.render('complete', {
            session,
            miningDuration,
            totalCoins: session.coinsMined // Pass totalCoins for display
        });
    } else {
        res.status(404).json({ message: 'No active mining session found' });
    }
});

router.get('/mining/progress', authenticateToken, async (req, res) => {
    const session = await MiningSession.findOne({ userId: req.user.userId, isMining: true });
    
    if (!session) {
        return res.status(404).render('progress', { session: null });
    }

    const currentTime = Date.now();
    const miningDuration = Math.floor((currentTime - session.startTime) / 1000); // in seconds
    const percentage = ((miningDuration % 3600) / 3600) * 100; // Progress towards next hour

    res.render('progress', { 
        session,
        miningDuration,
        percentageCompleted: percentage.toFixed(2),
        totalCoinsMined: session.coinsMined 
    });
});









export default router;
