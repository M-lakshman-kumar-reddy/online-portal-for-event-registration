const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { initializeDatabase } = require('./config/database');
const registrationRoutes = require('./routes/registration');

const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', limiter); // Apply rate limiting to API routes

// Routes
app.use('/api', registrationRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Initialize database and start server
const startServer = async () => {
  await initializeDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();

module.exports = app;
