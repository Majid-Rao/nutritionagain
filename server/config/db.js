const mongoose = require('mongoose');
require('dotenv').config();
// const dns = require('dns');

// // Force Google DNS
// dns.setServers(['8.8.8.8', '8.8.4.4']);
// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};
module.exports = connectDB;
