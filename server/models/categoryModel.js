const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name required'],
    trim: true,
    unique: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);