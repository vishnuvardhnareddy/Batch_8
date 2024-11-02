// controllers/user.controller.js
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

// Middleware to check if the user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // If authenticated, proceed to the next middleware/controller
    }
    return next(new ApiError(401, 'You must be logged in to access this resource.'));
};

// Register user
const registerUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword });

        res.status(201).json(new ApiResponse(201, user, 'User registered successfully', {
            message: 'Registration completed. You can now log in.',
        }));
    } catch (error) {
        return next(new ApiError(500, 'An error occurred during registration.', [error.message]));
    }
};

// Login user
const loginUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.status(200).json(new ApiResponse(200, req.user, 'Logged in successfully', {
            message: 'Welcome back!',
        }));
    }
    return next(new ApiError(401, 'User authentication failed. Please check your credentials.'));
};

// Logout user
const logoutUser = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(new ApiError(500, 'An error occurred while logging out. Please try again.'));
        }
        res.status(200).json(new ApiResponse(200, null, 'Logged out successfully', {
            message: 'You have been successfully logged out. Come back soon!',
        }));
    });
};

// Fetch user details
const getUserDetails = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next(new ApiError(401, 'User is not logged in.'));
    }
    res.status(200).json(new ApiResponse(200, req.user, 'User details retrieved successfully', {
        message: 'Here are your profile details.',
    }));
};

export { registerUser, loginUser, logoutUser, getUserDetails, isLoggedIn };
