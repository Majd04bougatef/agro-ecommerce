import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div style={styles.empty}>
        <p style={styles.emptyText}>🛒 Votre panier est vide</p>
        <button style={styles.btnShop} onClick={() => navigate('/products')}>
          Voir les produits
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Mon Panier</h2>
      {items.map(item => (
        <div key={item.id} style={styles.item}>
          <div style={styles.itemInfo}>
            <span style={styles.itemName}>{item.name}</span>
            <span style={styles.itemPrice}>{item.price.toFixed(2)} TND</span>
          </div>
          <div style={styles.itemControls}>
            <button style={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
            <span style={styles.qty}>{item.quantity}</span>
            <button style={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            <button style={styles.removeBtn} onClick={() => removeItem(item.id)}>🗑</button>
          </div>
          <span style={styles.subtotal}>{(item.price * item.quantity).toFixed(2)} TND</span>
        </div>
      ))}
      <div style={styles.footer}>
        <div style={styles.total}>
          Total : <strong>{totalAmount.toFixed(2)} TND</strong>
        </div>
        <div style={styles.actions}>
          <button style={styles.btnClear} onClick={clearCart}>Vider le panier</button>
          <button style={styles.btnCheckout} onClick={() => navigate('/checkout')}>
            Passer la commande
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { maxWidth: 640, margin: '0 auto', padding: 24 },
  title: { fontSize: 24, fontWeight: 700, color: '#1b5e20', marginBottom: 20 },
  item: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '14px 0', borderBottom: '1px solid #e8f5e9', gap: 12, flexWrap: 'wrap'
  },
  itemInfo: { flex: 1, display: 'flex', flexDirection: 'column', gap: 4 },
  itemName: { fontWeight: 600, color: '#333', fontSize: 15 },
  itemPrice: { color: '#666', fontSize: 13 },
  itemControls: { display: 'flex', alignItems: 'center', gap: 8 },
  qtyBtn: {
    width: 28, height: 28, borderRadius: 6, border: '1px solid #ccc',
    background: '#f5f5f5', cursor: 'pointer', fontSize: 16, fontWeight: 700
  },
  qty: { fontWeight: 700, fontSize: 15, minWidth: 20, textAlign: 'center' },
  removeBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, marginLeft: 4 },
  subtotal: { fontWeight: 700, color: '#2e7d32', minWidth: 80, textAlign: 'right' },
  footer: { marginTop: 24 },
  total: { fontSize: 18, marginBottom: 16, textAlign: 'right' },
  actions: { display: 'flex', gap: 12, justifyContent: 'flex-end' },
  btnClear: {
    background: '#fff', color: '#e53935', border: '1px solid #e53935',
    padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontWeight: 600
  },
  btnCheckout: {
    background: '#2e7d32', color: '#fff', border: 'none',
    padding: '10px 24px', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: 15
  },
  empty: { textAlign: 'center', padding: 60 },
  emptyText: { fontSize: 20, color: '#888', marginBottom: 20 },
  btnShop: {
    background: '#2e7d32', color: '#fff', border: 'none',
    padding: '12px 28px', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: 15
  },
};

export default Cart;
