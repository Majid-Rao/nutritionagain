// routes/contactRoute.js

const express = require('express');
const { handleContactForm } = require('../controllers/mailerController'); // Import the controller function
const router = express.Router();

// Route to handle form submission
router.post('/submit-form', handleContactForm); // POST request to handle form data

module.exports = router;
