const express = require('express');
const router = express.Router();
const { createPaymentIntent } = require('../services/stripeService');
const { sendOrderConfirmation } = require('../services/emailService');
const Order = require('../models/Order');
const auth = require('../middleware/auth');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-payment-intent', auth, async (req, res) => {
  try {
    const { amount } = req.body;
    const { clientSecret } = await createPaymentIntent(amount);
    res.json({ clientSecret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    await sendOrderConfirmation(session.customer_email, session.metadata.orderId);
  }

  res.json({ received: true });
});

router.post('/confirm', auth, async (req, res) => {
  try {
    const { orderId, paymentIntentId } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status: 'paid', paymentIntentId },
      { new: true }
    );
    if (order && order.customerEmail) {
      await sendOrderConfirmation(order.customerEmail, order._id);
    }
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
