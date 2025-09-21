const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); 
const authRouter = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const variationRoutes = require('./routes/variationRoutes'); // Import variation routes
const packageRoutes = require('./routes/packageRoutes'); // Import package routes
const orderRoutes = require('./routes/orderRoutes'); // Import order routes
const buyRoutes = require('./routes/buyRoutes'); // Import order routes
const customerRoutes = require('./routes/customerRoutes'); // Import customer routes
const transactionRoutes = require('./routes/transactionRoutes'); // Import transaction routes
const mailerRoutes = require('./routes/mailerRoutes');
const consultMailerRoutes = require('./routes/consultMailerRoutes');



const cors = require('cors');
const fs = require('fs');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
dotenv.config();
connectDB();
//Middleware
app.use(express.json());
//cors 
app.use(cors());
const uploadDirs = [
  path.join(__dirname, 'uploads'),
];
uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//Routes
app.get('/', (req, res) => {
  return res.send('Welcome to the Nutrition API');
});
app.use('/api/auth', authRouter);
app.use('/api', blogRoutes);
app.use('/api', variationRoutes); // Use variation routes
app.use('/api', packageRoutes); // Use package routes
app.use('/api', orderRoutes); // Use order routes
app.use('/api', buyRoutes); // Use buy routes
app.use('/api', customerRoutes); // Use customer routes
app.use('/api', transactionRoutes); // Use transaction routes
app.use('/api', mailerRoutes); // Use mailer routes
app.use('/api', consultMailerRoutes); // Use mailer routes
// Global error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});
////
app.listen(PORT, ()=>{
console.log(`Server is running on port ${PORT}`);
})
