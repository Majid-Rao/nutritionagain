const mongoose = require('mongoose');

const productOrderSchema = new mongoose.Schema({
  // ── Customer Details ──
  customerName:  { type: String, required: [true, 'Customer name required'], trim: true },
  customerEmail: { type: String, required: [true, 'Customer email required'], trim: true },
  customerPhone: { type: String, required: [true, 'Customer phone required'], trim: true },
  customerAddress: { type: String, required: [true, 'Customer address required'], trim: true },
  customerCity:  { type: String, trim: true },

  // ── Ordered Products ──
  products: [
    {
      product:       { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      productName:   { type: String },           // snapshot at time of order
      variation:     { type: String },           // e.g. "5mg"
      price:         { type: Number, required: true },
      quantity:      { type: Number, required: true, min: 1 },
      subtotal:      { type: Number, required: true },
    }
  ],

  // ── Pricing ──
  totalAmount: { type: Number, required: true },

  // ── Status ──
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid', 'refunded'],
    default: 'unpaid'
  },
  paymentMethod: {
    type: String,
    enum: ['cod', 'bank_transfer', 'online'],
    default: 'cod'
  },

  // ── Notes ──
  customerNote: { type: String, trim: true },

}, { timestamps: true });

module.exports = mongoose.model('productOrder', productOrderSchema);