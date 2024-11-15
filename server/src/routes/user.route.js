import express from 'express';
import passport from 'passport';
import { registerUser, loginUser, logoutUser } from '../controllers/user.controller.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = express.Router();

// Register user route
router.post('/register', asyncHandler(registerUser));

// Login user route
router.post(
    '/login',
    passport.authenticate('local', { session: true }), // Authenticate using passport
    asyncHandler(loginUser)
);

// Logout user route (only accessible if logged in)
router.get('/logout', isLoggedIn, asyncHandler(logoutUser));


router.get('/session', isLoggedIn, (req, res) => {
    if (req.isAuthenticated()) {
        return res.json({ isLoggedIn: true, user: req.user });
    }
    return res.json({ isLoggedIn: false });
});


export default router;
