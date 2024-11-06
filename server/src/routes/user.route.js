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

export default router;
