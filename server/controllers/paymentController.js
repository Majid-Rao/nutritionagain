const Square = require('square');

const client = new Square.Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  // environment: 'sandbox',
  environment: 'production',
});

const createPayment = async (req, res) => {
  try {
    const { token, amount } = req.body;

    const response = await client.paymentsApi.createPayment({
      sourceId: token,
      amountMoney: {
        amount: amount * 100,
        currency: 'USD',
      },
      idempotencyKey: Date.now().toString(),
    });

    res.status(200).json({
      success: true,
      message: "Payment successful",
      paymentId: response.result.payment.id,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createPayment };