// routes/contactRoute.js

const express = require('express');
const { handleMailerForm } = require('../controllers/consultmailerController'); // Import the controller function
const router = express.Router();

// Route to handle form submission
router.post('/submitconsult-form', handleMailerForm); // POST request to handle form data

module.exports = router;
