import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import databaseConnection from './database/connection.js';
import router from './router/route.js';
import mongoose from 'mongoose';

const app = express();
dotenv.config();
app.use(express.json({ limit: '50mb' }));

app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

const PORT = process.env.PORT;

// Connect to MongoDB
databaseConnection();

// Handle MongoDB connection events
mongoose.connection.on('error', (error) => {
    console.error(`MongoDB Connection Error: ${error}`);
});

mongoose.connection.once('open', () => {
    console.log('MongoDB is connected');
    // Start the Server
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // You might want to add proper error handling or logging here
    process.exit(1); // Consider exiting the process based on your application's needs
});

/** HTTP GET Request */
app.get('/', (req, res) => {
    res.status(201).json('Home GET Request');
});

app.use('/api', router);
