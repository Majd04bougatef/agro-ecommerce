import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface Props {
  orderId: string;
  onSuccess: () => void;
}

const CheckoutForm: React.FC<Props> = ({ orderId, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError('');

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/order-success?orderId=${orderId}` },
    });

    if (stripeError) {
      setError(stripeError.message || 'Erreur de paiement');
      setLoading(false);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <PaymentElement />
      {error && <p style={styles.error}>{error}</p>}
      <button type="submit" disabled={!stripe || loading} style={styles.btn}>
        {loading ? 'Traitement...' : 'Confirmer le paiement'}
      </button>
    </form>
  );
};

const styles: Record<string, React.CSSProperties> = {
  form: { display: 'flex', flexDirection: 'column', gap: 20 },
  error: { color: '#e53935', fontSize: 14 },
  btn: {
    background: '#2e7d32', color: '#fff', border: 'none',
    padding: '14px', borderRadius: 8, cursor: 'pointer',
    fontSize: 16, fontWeight: 700, marginTop: 8
  }
};

export default CheckoutForm;
