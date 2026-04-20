const router = require('express').Router();
const { createPaymentIntent } = require('../services/stripeService');
const { sendOrderConfirmation } = require('../services/emailService');
const Order = require('../models/Order');
const auth = require('../middleware/auth');

router.post('/create-payment-intent', auth, async (req, res) => {
  try {
    const { amount } = req.body;
    const { clientSecret } = await createPaymentIntent(amount);
    res.json({ clientSecret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
