const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  category: {
    type: String,
    enum: [
      "Low AMH",
      "Positive Pregnancies With Other Fertility Issues",
      "Reversals",
      "Male Fertility",
    ],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Testimonial", testimonialSchema);
