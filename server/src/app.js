import express from 'express';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import User from './models/user.model.js';

const app = express();

// CORS Middleware (only apply this once)
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true, // Allow cookies and credentials to be sent
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session middleware (make sure this is after CORS)
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,  // Prevent JavaScript from accessing cookies
        secure: false,   // Use `true` in production with HTTPS
        maxAge: 1000 * 60 * 60 * 24, // 1 day expiration for session cookie
    },
}));

// Passport.js initialization
app.use(passport.initialize());
app.use(passport.session());

// Passport Local strategy
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

// Passport serialization and deserialization
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

// Import and use user routes
app.get("/", (_, res) => {
    res.send("Server connected");
});

import userRoutes from './routes/user.route.js';
app.use('/api/v1/user', userRoutes);

import notesRoutes from "./routes/note.route.js";
app.use("/api/v1/notes", notesRoutes);

import fileRoutes from "./routes/files.route.js";
app.use("/api/v1/files", fileRoutes);

import flashcardRoutes from "./routes/flashcards.route.js";
app.use("/api/v1/flashcards", flashcardRoutes);

export default app;
