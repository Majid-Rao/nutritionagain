const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product required']
  },
  customerName: {
    type: String,
    required: [true, 'Customer name required'],
    trim: true
  },
  customerEmail: {
    type: String,
    required: [true, 'Customer email required'],
    trim: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating required'],
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: [true, 'Comment required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'   // by default pending rahega, admin approve kare ga
  }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);