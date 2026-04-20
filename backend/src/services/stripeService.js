const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (amount, currency = 'eur') => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      metadata: { integration: 'agro_ecommerce' }
    });
    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    throw new Error(`Erreur Stripe: ${error.message}`);
  }
};

module.exports = { createPaymentIntent };
