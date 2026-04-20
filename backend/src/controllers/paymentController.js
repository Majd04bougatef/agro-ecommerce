const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const { sendOrderConfirmation } = require('../services/emailService');

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
    console.error(`❌ Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Gérer l'événement spécifique
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    try {
      // Mettre à jour la commande associée en "Payée"
      const order = await Order.findOneAndUpdate(
        { paymentIntentId: session.payment_intent },
        { status: 'Payé' },
        { new: true }
      ).populate('user');

      if (order) {
        console.log(`✅ Commande ${order._id} payée avec succès.`);
        // Envoyer l'email de confirmation
        await sendOrderConfirmation(order.user.email, order);
      }
    } catch (error) {
      console.error('❌ Erreur lors du traitement du webhook:', error);
    }
  }

  res.json({ received: true });
};

module.exports = { handleWebhook };