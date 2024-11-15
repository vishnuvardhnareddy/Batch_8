import express from 'express';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import User from './models/user.model.js';
import MongoStore from 'connect-mongo';

// Load environment variables from .env file
dotenv.config();

const app = express();

// CORS Middleware (apply only once)
app.use(cors({
    origin: 'http://localhost:5173',  // Allow the specific frontend URL (e.g., React app)
    credentials: true,  // Allow cookies and credentials to be sent
}));

// MongoDB session store setup
const store = MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    crypto: {
        secret: process.env.SESSION_SECRET,
    },
    touchAfter: 24 * 60 * 60,  // Ensure the session is not prematurely destroyed
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// MongoStore error logging
store.on("error", (error) => {
    console.error('MongoStore error:', error);
});

// Session middleware (must be after CORS)
app.use(session({
    store,
    secret: process.env.SESSION_SECRET || 'secret',  // Use a secure secret for production
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,  // Prevent JavaScript from accessing cookies
        secure: process.env.NODE_ENV === 'production',  // `true` for HTTPS in production
        maxAge: 1000 * 60 * 60 * 24,  // 1-day expiration for session cookie
    },
}));

// Passport.js initialization
app.use(passport.initialize());
app.use(passport.session());

// Passport Local strategy for user authentication
passport.use(new LocalStrategy.Strategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ username });
            if (!user) {
                return done(null, false, { message: 'Incorrect username' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password' });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

// Passport serialization/deserialization
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

// Root route for server status
app.get("/", (_, res) => {
    res.send("Server connected");
});

// Import and use route modules
import userRoutes from './routes/user.route.js';
app.use('/api/v1/user', userRoutes);

import notesRoutes from './routes/note.route.js';
app.use("/api/v1/notes", notesRoutes);

import fileRoutes from './routes/files.route.js';
app.use("/api/v1/files", fileRoutes);

import flashcardRoutes from './routes/flashcards.route.js';
app.use("/api/v1/flashcards", flashcardRoutes);

// Global error handler (catch unhandled errors)
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err.stack);  // Log error stack
    res.status(500).send('Something went wrong!');
});

// Export the app for use in server setup
export default app;
