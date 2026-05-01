const express = require('express');
const router = express.Router();
const {
  createCheckoutSession,
  createPaymentIntent,
  handleWebhook
} = require('../controllers/paymentController');

router.post('/create-checkout-session', createCheckoutSession);
router.post('/create-payment-intent', createPaymentIntent); // ← ye add hai?
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  handleWebhook
);

module.exports = router;