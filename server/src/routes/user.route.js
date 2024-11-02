// routes/user.route.js
import express from 'express';
import passport from 'passport';
import { registerUser, loginUser, logoutUser, isLoggedIn } from '../controllers/user.controller.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = express.Router();

router.post('/register', asyncHandler(registerUser));
router.post('/login', passport.authenticate('local', { session: true }), asyncHandler(loginUser));
router.get('/logout', isLoggedIn, asyncHandler(logoutUser)); // Ensure user is logged in before logging out

export default router;
