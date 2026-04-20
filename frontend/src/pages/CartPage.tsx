import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, totalAmount, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div style={styles.empty}>
        <span style={{ fontSize: 64 }}>🛒</span>
        <h2>Votre panier est vide</h2>
        <button onClick={() => navigate('/products')} style={styles.btnGreen}>
          Voir les produits
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Mon Panier</h1>
      <div style={styles.layout}>
        {/* Liste des articles */}
        <div style={styles.itemsList}>
          {items.map(item => (
            <div key={item.id} style={styles.item}>
              <div style={styles.itemInfo}>
                <div style={styles.itemEmoji}>{item.imageUrl ? '' : '🌿'}</div>
                <div>
                  <p style={styles.itemName}>{item.name}</p>
                  <p style={styles.itemPrice}>{item.price.toFixed(2)} € / {item.unit}</p>
                </div>
              </div>
              <div style={styles.itemActions}>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={styles.qtyBtn}>−</button>
                <span style={styles.qty}>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={styles.qtyBtn}>+</button>
                <button onClick={() => removeItem(item.id)} style={styles.removeBtn}>🗑</button>
              </div>
              <p style={styles.subtotal}>{(item.price * item.quantity).toFixed(2)} €</p>
            </div>
          ))}
        </div>

        {/* Récapitulatif */}
        <div style={styles.summary}>
          <h2 style={styles.summaryTitle}>Récapitulatif</h2>
          <div style={styles.summaryRow}>
            <span>Sous-total</span>
            <span>{totalAmount.toFixed(2)} €</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Livraison</span>
            <span style={{ color: '#4caf50' }}>Gratuite</span>
          </div>
          <hr style={{ margin: '12px 0', border: 'none', borderTop: '1px solid #eee' }} />
          <div style={{ ...styles.summaryRow, fontWeight: 700, fontSize: 18 }}>
            <span>Total</span>
            <span>{totalAmount.toFixed(2)} €</span>
          </div>
          <button onClick={handleCheckout} style={styles.checkoutBtn}>
            Procéder au paiement
          </button>
          <button onClick={clearCart} style={styles.clearBtn}>Vider le panier</button>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: { maxWidth: 1100, margin: '0 auto', padding: '40px 32px' },
  title: { fontSize: 32, fontWeight: 700, color: '#1b5e20', marginBottom: 32 },
  layout: { display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' },
  itemsList: { flex: 2, display: 'flex', flexDirection: 'column', gap: 16, minWidth: 300 },
  item: {
    background: '#fff', borderRadius: 12, padding: 16,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)', flexWrap: 'wrap', gap: 12
  },
  itemInfo: { display: 'flex', alignItems: 'center', gap: 12 },
  itemEmoji: { fontSize: 32 },
  itemName: { fontWeight: 600, color: '#1b5e20', fontSize: 15 },
  itemPrice: { color: '#666', fontSize: 13 },
  itemActions: { display: 'flex', alignItems: 'center', gap: 8 },
  qtyBtn: {
    width: 30, height: 30, borderRadius: '50%', border: '2px solid #4caf50',
    background: '#fff', color: '#4caf50', cursor: 'pointer', fontWeight: 700, fontSize: 16
  },
  qty: { minWidth: 24, textAlign: 'center', fontWeight: 700 },
  removeBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 },
  subtotal: { fontWeight: 700, color: '#2e7d32', fontSize: 16, minWidth: 70, textAlign: 'right' },
  summary: {
    flex: 1, background: '#fff', borderRadius: 12, padding: 24,
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)', minWidth: 260,
    display: 'flex', flexDirection: 'column', gap: 12
  },
  summaryTitle: { fontSize: 20, fontWeight: 700, color: '#1b5e20', marginBottom: 8 },
  summaryRow: { display: 'flex', justifyContent: 'space-between', fontSize: 15 },
  checkoutBtn: {
    background: '#2e7d32', color: '#fff', border: 'none', borderRadius: 8,
    padding: '14px', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginTop: 8
  },
  clearBtn: {
    background: 'none', color: '#e53935', border: '1px solid #e53935',
    borderRadius: 8, padding: '10px', fontSize: 14, cursor: 'pointer'
  },
  empty: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', gap: 16, padding: 80, color: '#666'
  },
  btnGreen: {
    background: '#4caf50', color: '#fff', border: 'none',
    padding: '12px 28px', borderRadius: 8, cursor: 'pointer', fontSize: 15, fontWeight: 700
  }
};

export default CartPage;
