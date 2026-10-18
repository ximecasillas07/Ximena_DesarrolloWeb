import express from 'express';
import authRoutes from './routes/authRoutes';
import apiRoutes from './routes/apiRoutes';
import { errorMiddleware } from './middleware/errorMiddleware';
import { protect, requireAdmin } from './middleware/authMiddleware';
import { AppError } from './utils/appError';
import { connectDB } from './config/db';

import {loadEnvFile} from "node:process";
import { createUser } from './services/user-service';
loadEnvFile();
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const dbName = 'test';

const app = express();
const PORT = 3000;

//mongo datebase
const mongoUrl = `mongodb+srv://${dbUser}:${dbPass}@cluster0.mtnp2kt.mongodb.net/${dbName}` 
connectDB(mongoUrl);

// Body parser
app.use(express.json());

// TODO: Serve static files from the 'public' directory so index.html loads on http://localhost:3000
app.use(express.static("public"));



// TODO: Mount Routers
app.use("/api", protect, apiRoutes);
app.use('/api/auth', requireAdmin, authRoutes);
app.post("/user", (req, res) => {
    const {username, name, email, password} = req.body;
    if(!username || !email || !password)
        return res.status(400).json({message: "All fields are required!"});
    createUser({username, name, email, password})
    .then((user) => res.json(user))
    .catch((user) => next(err));
});


// 404 Unhandled Route Handler
app.all("/{*splat}", (req, res, next) => {
    next(new AppError(`Cannot find route ${req.originalUrl} on this server!`, 404));
});

// Centralized Global Error Handler
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`🚀 SustainHub Server running at http://localhost:${PORT}`);
});
