const express = require('express');
const router = express.Router();
const {
  addReview,
  getApprovedReviews,
  getAllReviews,
  getSingleReview,
  updateReviewStatus,
  deleteReview
} = require('../controllers/reviewController');

// Customer routes
router.post('/addReview',addReview);           
router.get('/getApprovedReviews/:productId',getApprovedReviews);  

// Admin routes
router.get('/getAllReviews', getAllReviews);
router.get('/getSingleReview/:id', getSingleReview);      
router.patch('/updateReviewStatus/:id',updateReviewStatus);   
router.delete('/deleteReview/:id',deleteReview);        

module.exports = router;