// controllers/transactionController.js
const Transaction = require('../models/transactionModel');
const mongoose = require('mongoose');
// Create a transaction record
exports.createTransaction = async (req, res) => {
  try {
    const { userId, amount, transactionId, paymentMethod } = req.body;

    // Validate if the userId is a valid MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    // Create transaction with the original ObjectId
    const transaction = new Transaction({
      userId: userId, // Storing the original MongoDB ObjectId
      amount,
      transactionId,
      paymentMethod,
      paymentStatus: 'pending', // Initially set to pending
    });

    // Save the transaction
    await transaction.save();

    // Send a response with the transaction and a converted simpleId
    const simpleId = `user-${userId.toString().slice(-5)}`; // Create simpleId (last 5 characters of ObjectId)
    
    res.status(201).json({
      message: "Transaction created",
      transaction,
      simpleId: simpleId // Send the simpleId to the frontend
    });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ message: "Server Error" });
  }
};






// Update the payment status
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { transactionId, paymentStatus } = req.body;

    // Update payment status in the database
    const transaction = await Transaction.findOneAndUpdate(
      { transactionId },
      { paymentStatus },
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Payment status updated", transaction });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Fetch all transactions
exports.fetchAllTransactions = async (req, res) => {
  try {
    // Fetch all transactions from the database
    const transactions = await Transaction.find();

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ message: "No transactions found" });
    }

    res.status(200).json({ transactions });
  } catch (error) {
    console.error("Error fetching all transactions:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Fetch transaction details by transactionId or userId
exports.fetchTransaction = async (req, res) => {
  try {
    const { transactionId, userId } = req.query;

    let query = {};
    if (transactionId) {
      query.transactionId = transactionId;
    }
    if (userId) {
      query.userId = userId;
    }

    // Fetch the transaction based on either transactionId or userId
    const transaction = await Transaction.findOne(query);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ transaction });
  } catch (error) {
    console.error("Error fetching transaction:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
