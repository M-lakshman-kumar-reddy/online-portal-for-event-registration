const express = require('express');
const { body, validationResult } = require('express-validator');
const { pool } = require('../config/database');

const router = express.Router();

// Validation rules for registration
const registrationValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 255 })
    .withMessage('Name must be between 2 and 255 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('event_choice')
    .trim()
    .notEmpty()
    .withMessage('Event choice is required')
    .isLength({ min: 1, max: 255 })
    .withMessage('Event choice must be between 1 and 255 characters')
];

// POST /api/register - Register a new participant
router.post('/register', registrationValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, event_choice } = req.body;

    // Insert registration into database
    const [result] = await pool.query(
      'INSERT INTO registrations (name, email, event_choice) VALUES (?, ?, ?)',
      [name, email, event_choice]
    );

    res.status(201).json({
      message: 'Registration successful',
      registration: {
        id: result.insertId,
        name,
        email,
        event_choice
      }
    });
  } catch (error) {
    // Handle duplicate email error
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        errors: [{ msg: 'Email is already registered' }]
      });
    }
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/registrations - Get all registrations
router.get('/registrations', async (req, res) => {
  try {
    const [registrations] = await pool.query(
      'SELECT id, name, email, event_choice, created_at FROM registrations ORDER BY created_at DESC'
    );
    res.json(registrations);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
