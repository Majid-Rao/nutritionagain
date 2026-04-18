const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); 
const authRouter = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const variationRoutes = require('./routes/variationRoutes');
const packageRoutes = require('./routes/packageRoutes');
const orderRoutes = require('./routes/orderRoutes');
const buyRoutes = require('./routes/buyRoutes');
const customerRoutes = require('./routes/customerRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const mailerRoutes = require('./routes/mailerRoutes');
const consultemailRoutes = require('./routes/consultemailRoutes');
const testimonialRoutes = require("./routes/testimonialRoutes");
const programRoutes = require('./routes/programRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const cors = require('cors');
const fs = require('fs');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Port configuration
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration for production
const allowedOrigins = [
  'https://aishalakhwani.com',
  'https://www.aishalakhwani.com', // www version bhi allow karo
];

// Development mein localhost bhi allow karo
if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.push('http://localhost:3000');
  allowedOrigins.push('http://localhost:5173');
}

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Create upload directories
const uploadDirs = [
  path.join(__dirname, 'uploads'),
  path.join(__dirname, 'uploads/programs'),
];

uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Static file serving for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Production specific upload handling
if (process.env.NODE_ENV === 'production') {
  // cPanel pe /tmp/programs use karna better hai
  if (fs.existsSync('/tmp/programs')) {
    app.use('/uploads/programs', express.static('/tmp/programs'));
  } else {
    app.use('/uploads/programs', express.static(path.join(__dirname, 'uploads/programs')));
  }
} else {
  app.use('/uploads/programs', express.static(path.join(__dirname, 'uploads/programs')));
}

// Health check endpoint (cPanel monitoring ke liye)
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api', blogRoutes);
app.use('/api', variationRoutes);
app.use('/api', packageRoutes);
app.use('/api', orderRoutes);
app.use('/api', buyRoutes);
app.use('/api', customerRoutes);
app.use('/api', transactionRoutes);
app.use('/api', mailerRoutes);
app.use('/api', consultemailRoutes);
app.use('/api', testimonialRoutes);
app.use('/api', programRoutes);
app.use('/api/payment', paymentRoutes);
// Serve static files from dist (React build)
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1d', // Cache static files for 1 day
  etag: true
}));

// Handle React Router - SPA fallback
app.use((req, res, next) => {
  // Skip if it's an API route
  if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
    return next();
  }
  
  // Send the React app for all other routes
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Application not found. Please build the frontend.');
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
  res.status(err.statusCode).json({
    status: err.status,
    message: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong!' 
      : err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✓ CORS enabled for: ${allowedOrigins.join(', ')}`);
});

module.exports = app;