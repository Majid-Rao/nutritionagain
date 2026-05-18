const mongoose = require('mongoose');

const variationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Variation name required'],
    trim: true,
    unique: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Variation', variationSchema);