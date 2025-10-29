const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  heading: {                 
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  video: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Program = mongoose.model('Program', programSchema);
module.exports = Program;
