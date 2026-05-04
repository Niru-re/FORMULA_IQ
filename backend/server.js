const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Don't exit the process, just log the error
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    // Don't exit the process, just log the error
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection (Optional for Demo)
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/skinlog';
// console.log('Attempting to connect to MongoDB...');
// mongoose.connect(MONGODB_URI)
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => {
//         console.warn('MongoDB not found. Using Mock Database for demo.');
//         console.warn('Error details:', err.message);
//         // Server continues to run using Mock DB
//     });
console.log('Using Mock Database for demo (MongoDB connection disabled)');

// Routes
console.log('Loading routes...');
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/analysis', require('./routes/analysisRoutes'));
// app.use('/api/recommendations', require('./routes/recommendationRoutes'));

app.get('/', (req, res) => {
    res.send('Skin Log API is running...');
});

console.log('Starting server...');
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
