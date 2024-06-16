import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import userRoutes from './routes/user';
import authRoutes from './routes/auth';
import './config/passport';

// Connect to MongoDB using correct options
mongoose.connect(process.env.MONGO_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true
} as mongoose.ConnectOptions)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Create an Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(session({ secret: process.env.JWT_SECRET!, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});