import React, { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { confirmPayment } from '../services/api';

const OrderSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const paymentIntentId = searchParams.get('payment_intent');
  const [confirmed, setConfirmed] = useState(false);
  const called = useRef(false);

  useEffect(() => {
    if (orderId && paymentIntentId && !called.current) {
      called.current = true;
      confirmPayment(orderId, paymentIntentId)
        .then(() => setConfirmed(true))
        .catch(() => setConfirmed(true)); // still show success even if confirm fails
    } else {
      setConfirmed(true);
    }
  }, [orderId, paymentIntentId]);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.icon}>✅</div>
        <h1 style={styles.title}>Commande confirmée !</h1>
        <p style={styles.text}>
          Merci pour votre commande. Un email de confirmation vous a été envoyé.
        </p>
        {orderId && (
          <p style={styles.orderId}>
            Numéro de commande : <strong>#{orderId}</strong>
          </p>
        )}
        {confirmed && (
          <div style={styles.actions}>
            <Link to="/products" style={styles.btnPrimary}>Continuer mes achats</Link>
          </div>
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    minHeight: '70vh', padding: 32
  },
  card: {
    background: '#fff', borderRadius: 16, padding: '48px 40px',
    textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
    maxWidth: 480, width: '100%'
  },
  icon: { fontSize: 72, marginBottom: 16 },
  title: { fontSize: 28, fontWeight: 700, color: '#1b5e20', marginBottom: 12 },
  text: { color: '#555', fontSize: 16, lineHeight: 1.6, marginBottom: 12 },
  orderId: { color: '#888', fontSize: 14, marginBottom: 24 },
  actions: { display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' },
  btnPrimary: {
    background: '#2e7d32', color: '#fff', padding: '12px 28px',
    borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 15
  }
};

export default OrderSuccess;
