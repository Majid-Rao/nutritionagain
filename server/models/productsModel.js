const mongoose = require('mongoose');

const productVariationSchema = new mongoose.Schema({
  variation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Variation',
    required: false
  },
  price: {
    type: Number,
    required: [true, 'Price for this variation is required'],
    min: 0
  },
}, { _id: false }); 
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name required'],
    trim: true
  },
  shortDetail: {
    type: String,
    trim: true
  },
  longDetail: {
    type: String,
    trim: true
  },
  basePrice: {          
    type: Number,
    min: 0,
    default: 0
  },
  images: [
    { type: String }     
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category required']
  },
  variations: [productVariationSchema]  
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);