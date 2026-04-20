const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const { sendOrderConfirmation } = require('../services/emailService');
const Order = require('../models/Order');

// POST /api/webhook
router.post('/', async (req, res) => {
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

  // Handle PaymentIntent succeeded (used by stripe.confirmPayment())
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const orderId = paymentIntent.metadata && paymentIntent.metadata.orderId;

    if (orderId) {
      const order = await Order.findByIdAndUpdate(
        orderId,
        { status: 'paid', paymentIntentId: paymentIntent.id },
        { new: true }
      );
      if (order && order.customerEmail) {
        await sendOrderConfirmation(order.customerEmail, order._id);
      }
    }
  }

  // Handle Stripe Checkout session (alternative flow)
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const orderId = session.metadata && session.metadata.orderId;
    if (orderId) {
      await sendOrderConfirmation(session.customer_email, orderId);
    }
  }

  res.json({ received: true });
});

module.exports = router;
