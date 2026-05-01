const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// ✅ 1. Checkout Session (agar kabhi redirect wala use karna ho)
const createCheckoutSession = async (req, res) => {
  try {
    const { amount, currency = 'usd' } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency,
            product_data: { name: 'Payment' },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe Error:', error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ 2. Payment Intent (frontend card form ke liye — ye use hoga)
const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'usd' } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // cents me convert
      currency,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('PaymentIntent Error:', error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ 3. Webhook
const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('✅ Payment successful:', session.id);
      break;

    case 'payment_intent.succeeded':
      const intent = event.data.object;
      console.log('✅ PaymentIntent succeeded:', intent.id);
      break;

    case 'payment_intent.payment_failed':
      console.log('❌ Payment failed');
      break;

    default:
      console.log(`Unhandled event: ${event.type}`);
  }

  res.json({ received: true });
};

// ✅ Teeno export karo
module.exports = { createCheckoutSession, createPaymentIntent, handleWebhook };