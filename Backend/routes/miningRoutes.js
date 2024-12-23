import express from 'express';
import jwt from 'jsonwebtoken';
import MiningSession from '../models/MiningSession.js';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import User from '../models/User.js';
const { ObjectId } = mongoose.Types;

const router = express.Router();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized access. Please log in.' });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('JWT verification error:', err);
            return res.status(403).json({ error: 'Invalid token. Please log in again.' });
        }

        console.log('Decoded token payload:', user); 
        req.user = user;
        next();
    });
};



router.post('/mining/start', authenticateToken, async (req, res) => {
    try {
      // Check if a mining session already exists
      const existingSession = await MiningSession.findOne({ userId: req.user.userId, userame:req.user.userame,    isMining: true });
  console.log(req.user.username)
      if (existingSession) {
        const elapsed = Date.now() - new Date(existingSession.startTime).getTime();
        const hoursElapsed = elapsed / (1000 * 3600);
  
        if (hoursElapsed >= 24) {
          existingSession.isMining = false;
          existingSession.endTime = Date.now();
          const coinsEarned = Math.floor(hoursElapsed) * 0.1;
          existingSession.coinsMined += coinsEarned;
          existingSession.totalCoins += coinsEarned;
  
          await existingSession.save();
        }
  
        return res.status(200).json({
          message: "Mining session already started.",
          session: {
            userId: req.user.userId,
            username: req.user.username,
            isMining: existingSession.isMining,
            coinsMined: existingSession.coinsMined,
            totalCoins: existingSession.totalCoins,
            elapsedTime: Math.floor(elapsed / 1000), 
          },
        });
      }
  
      const newSession = new MiningSession({
        userId: req.user.userId,
        username: req.user.username,
        startTime: Date.now(),
        isMining: true,
        coinsMined: 0,
        totalCoins: 0,
        lastUpdated: Date.now()
      });
  console.log(newSession)
      await newSession.save();
  
      return res.status(200).json({
        message: "Mining session started successfully.",
        session: {
          userId: req.user.userId,
            username: req.user.username,
          isMining: true,

          coinsMined: newSession.coinsMined,
          totalCoins: newSession.totalCoins,
          elapsedTime: 0, 
        },
      });
    } catch (error) {
      console.error("Error while starting mining session:", error);
      return res.status(500).json({ error: 'An error occurred while starting the mining session.' });
    }
  });
  
  router.get('/mining/status', authenticateToken, async (req, res) => {
    try {
        console.log('Decoded token payload (req.user):', req.user);

        const session = await MiningSession.findOne({ userId: req.user.userId, isMining: true });
        console.log('Session found:', session);

        let miningDuration = 0;
        let coinsEarned = 0;
        let startTime = null;

        if (session) {
            startTime = session.startTime;

            console.log('Start time:', startTime);

            if (!startTime) {
                return res.status(400).json({ message: 'Invalid session start time' });
            }

            const currentTime = Date.now();
            miningDuration = Math.floor((currentTime - new Date(startTime).getTime()) / 1000);
            console.log('Mining duration in seconds:', miningDuration);

            const hoursMined = Math.floor(miningDuration / 3600);
            coinsEarned = (hoursMined * 0.1).toFixed(1);

            console.log('Calculated coins earned:', coinsEarned);

            session.coinsMined = coinsEarned;
            console.log('Saving session with coinsMined:', coinsEarned);

            await session.save();
        }

        res.status(200).json({
            session: session ? session.toObject() : null,
            username: req.user.username,
            miningDuration,
            coinsEarned,
            startTime
        });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

router.post('/mining/stop', authenticateToken, async (req, res) => {
    const session = await MiningSession.findOne({ userId: req.user.userId,   isMining: true });
    
    if (session) {
        const elapsed = Date.now() - new Date(session.startTime).getTime();
        const hoursElapsed = elapsed / (1000 * 3600);
        session.isMining = false;
        session.endTime = Date.now();

        const coinsEarned = Math.floor(hoursElapsed) * 0.1;
        session.coinsMined += coinsEarned;
        session.totalCoins += coinsEarned;
        await session.save();

        res.json({
session : {
    userId: req.user.userId,
    username: req.user.username,
    isMining: session.isMining,
    coinsMined: session.coinsMined,
    totalCoins: session.totalCoins,
    elapsedTime: Math.floor(elapsed / 1000),
    },
    message: 'Mining session stopped successfully',
        });
    }

     else {
       res.json({ message: 'No active mining session found' }); 
    }
});

router.get('/mining/progress', authenticateToken, async (req, res) => {
    try {
        // Find the active mining session
        const session = await MiningSession.findOne({ userId: req.user.userId, isMining: true });
        
        if (!session) {
            // No active session, fetch the last completed session
            const previousSession = await MiningSession.findOne({ userId: req.user.userId }).sort({ endTime: -1 });
            return res.status(400).json({
                message: 'No active mining session. Here is your previous data.',
                totalCoinsMined: previousSession ? previousSession.totalCoins || 0 : 0, // Handle undefined
            });
        }

        // Active session found, send progress data
        res.json({
            startTime: session.startTime,
            totalCoinsMined: session.totalCoins || 0, // Handle undefined
        });
    } catch (error) {
        console.error('Error fetching mining progress:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.get('/rewards/monthly', authenticateToken, async (req, res) => {
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const rewards = await MiningSession.aggregate([
        { $match: { userId: req.user.userId, startTime: { $gte: startOfMonth } } },
        { $group: { _id: "$userId", totalCoins: { $sum: "$coinsMined" } } }
    ]);
    
    const monthlyRewards = rewards.length > 0 ? rewards[0].totalCoins : 0;
    res.json({ totalMonthlyRewards: monthlyRewards });
});

router.post('/referral/invite', authenticateToken, async (req, res) => {
    const referralCode = `${req.user.userId}-${Date.now()}`;
    
    await Referral.create({ userId: req.user.userId, referralCode });

    res.json({ message: 'Referral link generated', referralLink: `https://yourapp.com/register?ref=${referralCode}` });
});

// Claim rewards route
router.post('/rewards/claim', authenticateToken, async (req, res) => {
    const userId = req.user.userId;
    const currentDate = new Date();

    const lastMonth = new Date(currentDate);
    lastMonth.setDate(currentDate.getDate() - 30);

    try {
        const sessions = await MiningSession.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                    startTime: { $gte: lastMonth },
                    isMining: false,
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$startTime" }
                    }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        let consecutiveDays = 0;
        let maxConsecutiveDays = 0;
        let previousDate = null;

        sessions.forEach(session => {
            const activityDate = new Date(session._id);

            if (previousDate) {
                const diffInDays = Math.floor((activityDate - previousDate) / (1000 * 60 * 60 * 24));
                
                if (diffInDays === 1) {
                    consecutiveDays++;
                } else if (diffInDays > 1) {
                    consecutiveDays = 1;
                }
            } else {
                consecutiveDays = 1;
            }

            maxConsecutiveDays = Math.max(maxConsecutiveDays, consecutiveDays);
            previousDate = activityDate;
        });

        let coinsToClaim = 0;
        if (maxConsecutiveDays >= 28) {
            coinsToClaim = 20;
        } else if (maxConsecutiveDays >= 21) {
            coinsToClaim = 15;
        } else if (maxConsecutiveDays >= 14) {
            coinsToClaim = 10;
        } else if (maxConsecutiveDays >= 7) {
            coinsToClaim = 5;
        }

        if (coinsToClaim === 0) {
            return res.json({
                message: 'You are not eligible for rewards',
                totalCoins: 0
            });
        }

        const user = await User.findById(userId);
        if (user) {
            user.walletCoins = (user.walletCoins || 0) + coinsToClaim;
            await user.save();

            return res.status(200).json({
                message: `You have successfully claimed ${coinsToClaim} coins!`,
                totalCoins: user.walletCoins
            });
        } else {
            return res.json({ message: 'Error claiming rewards' });
        }

    } catch (error) {
        console.error(error);
        return res.json({ message: 'Error claiming rewards' });
    }
});

export default router;
