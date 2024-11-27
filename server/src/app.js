// app.js (or your main file)
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import User from './models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();


app.use(cors({
    origin: 'http://localhost:5173', // or update it to your frontend URL
    credentials: true, // Allow credentials like cookies or authorization headers
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Middleware



// app.js (express-session config)
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,  // Ensures cookie is not accessible via JavaScript
        secure: process.env.NODE_ENV === 'production' || false,  // Use secure cookies only in production
        maxAge: 1000 * 60 * 60 * 24,  // 24 hours expiration
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
    res.send("server connected");
});

import userRoutes from './routes/user.route.js';
app.use('/api/v1/user', userRoutes);

import CoffeeRoutes from "./routes/coffee.route.js"
app.use("/api/v1/coffee", CoffeeRoutes)

// Test route
import cartRoutes from "./routes/cart.route.js"
app.use("/api/v1/cart", cartRoutes)

app.get('/', (req, res) => res.send('Hello, world!'));

export default app;
