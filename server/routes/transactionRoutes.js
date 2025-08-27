// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const { createTransaction, updatePaymentStatus, fetchTransaction, fetchAllTransactions } = require('../controllers/transactionController');

// Create a new transaction
router.post('/createpayment', createTransaction);

// Update payment status (after gateway response)
router.put('/update-status/:id', updatePaymentStatus);

// Fetch a specific transaction by transactionId or userId
router.get('/fetch/:id', fetchTransaction);

// Fetch all transactions
router.get('/fetch-all', fetchAllTransactions);

module.exports = router;
