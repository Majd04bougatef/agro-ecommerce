import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { createOrder, createPaymentIntent } from '../services/api';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_REMPLACER');

const Checkout: React.FC = () => {
  const { items, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState('');
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (items.length === 0) { navigate('/cart'); return; }

    const init = async () => {
      try {
        const orderItems = items.map(i => ({
          productId: i.id, name: i.name, price: i.price, quantity: i.quantity, unit: i.unit
        }));
        const orderRes = await createOrder({
          items: orderItems, totalAmount, customerEmail: user?.email
        });
        setOrderId(orderRes.data._id);

        const payRes = await createPaymentIntent(totalAmount);
        setClientSecret(payRes.data.clientSecret);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Erreur lors de la création de la commande');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const handleSuccess = () => {
    clearCart();
    navigate(`/order-success?orderId=${orderId}`);
  };

  if (loading) return <div style={styles.center}>Préparation du paiement...</div>;
  if (error) return <div style={styles.center}><p style={{ color: 'red' }}>{error}</p></div>;

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Paiement sécurisé</h1>
      <div style={styles.layout}>
        {/* Récap commande */}
        <div style={styles.recap}>
          <h2 style={styles.recapTitle}>Votre commande</h2>
          {items.map(item => (
            <div key={item.id} style={styles.recapItem}>
              <span>{item.name} × {item.quantity}</span>
              <span>{(item.price * item.quantity).toFixed(2)} €</span>
            </div>
          ))}
          <hr style={{ margin: '12px 0' }} />
          <div style={{ ...styles.recapItem, fontWeight: 700, fontSize: 18 }}>
            <span>Total</span>
            <span>{totalAmount.toFixed(2)} €</span>
          </div>
        </div>

        {/* Formulaire Stripe */}
        <div style={styles.paymentBox}>
          <h2 style={styles.recapTitle}>Informations de paiement</h2>
          <p style={styles.testHint}>
            💳 Carte de test : <strong>4242 4242 4242 4242</strong> — Date : 12/34 — CVC : 123
          </p>
          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm orderId={orderId} onSuccess={handleSuccess} />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: { maxWidth: 1000, margin: '0 auto', padding: '40px 32px' },
  title: { fontSize: 32, fontWeight: 700, color: '#1b5e20', marginBottom: 32 },
  layout: { display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' },
  recap: {
    flex: 1, background: '#f1f8e9', borderRadius: 12, padding: 24,
    display: 'flex', flexDirection: 'column', gap: 10, minWidth: 260
  },
  recapTitle: { fontSize: 18, fontWeight: 700, color: '#1b5e20', marginBottom: 8 },
  recapItem: { display: 'flex', justifyContent: 'space-between', fontSize: 15 },
  paymentBox: {
    flex: 2, background: '#fff', borderRadius: 12, padding: 32,
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)', minWidth: 300
  },
  testHint: {
    background: '#fff9c4', padding: 12, borderRadius: 8, fontSize: 13,
    marginBottom: 16, border: '1px solid #f9a825'
  },
  center: { display: 'flex', justifyContent: 'center', padding: 80, fontSize: 18, color: '#666' }
};

export default Checkout;
