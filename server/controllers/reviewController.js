const Review = require('../models/reviewModel');

// Customer review submit kare ga
exports.addReview = async (req, res) => {
  try {
    const { product, customerName, customerEmail, rating, comment } = req.body;

    const review = await Review.create({
      product, customerName, customerEmail, rating, comment
      // status automatically 'pending' hoga
    });

    res.status(201).json({
      success: true,
      message: 'Review submitted, waiting for approval',
      review
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Frontend pe sirf approved reviews dikhenge (product ke hisaab se)
exports.getApprovedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
      status: 'approved'
    }).populate('product', 'name');

    res.status(200).json({ success: true, reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Admin — sari reviews dekhe (all statuses)
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('product', 'name');

    res.status(200).json({ success: true, reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Admin — single review dekhe
exports.getSingleReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('product', 'name');

    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });

    res.status(200).json({ success: true, review });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Admin — status change kare (approve ya reject)
exports.updateReviewStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status — only pending, approved, rejected allowed'
      });
    }

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('product', 'name');

    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });

    res.status(200).json({ success: true, review });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Admin — review delete kare
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    res.status(200).json({ success: true, message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};