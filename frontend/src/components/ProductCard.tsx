import React from 'react';
import { useCart } from '../contexts/CartContext';

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
  imageUrl: string;
  description: string;
}

const CATEGORY_EMOJI: Record<string, string> = {
  légumes: '🥦', fruits: '🍎', céréales: '🌾', produits_laitiers: '🥛', viandes: '🥩'
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      unit: product.unit,
      imageUrl: product.imageUrl
    });
  };

  return (
    <div style={styles.card}>
      <div style={styles.imageWrapper}>
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} style={styles.image} />
        ) : (
          <div style={styles.placeholder}>{CATEGORY_EMOJI[product.category] || '🌿'}</div>
        )}
      </div>
      <div style={styles.body}>
        <span style={styles.category}>{product.category.replace('_', ' ')}</span>
        <h3 style={styles.name}>{product.name}</h3>
        <p style={styles.description}>{product.description}</p>
        <div style={styles.footer}>
          <span style={styles.price}>{product.price.toFixed(2)} € / {product.unit}</span>
          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            style={product.stock === 0 ? styles.btnDisabled : styles.btn}
          >
            {product.stock === 0 ? 'Rupture' : '+ Panier'}
          </button>
        </div>
        <p style={styles.stock}>Stock : {product.stock} {product.unit}</p>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: '#fff', borderRadius: 12, overflow: 'hidden',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)', transition: 'transform 0.2s',
    display: 'flex', flexDirection: 'column'
  },
  imageWrapper: { height: 160, background: '#f1f8e9', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  placeholder: { fontSize: 64 },
  body: { padding: 16, display: 'flex', flexDirection: 'column', gap: 6, flex: 1 },
  category: {
    fontSize: 11, textTransform: 'uppercase', color: '#4caf50',
    fontWeight: 600, letterSpacing: 1
  },
  name: { fontSize: 16, fontWeight: 700, color: '#1b5e20' },
  description: { fontSize: 13, color: '#666', flexGrow: 1 },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  price: { fontSize: 16, fontWeight: 700, color: '#2e7d32' },
  btn: {
    background: '#4caf50', color: '#fff', border: 'none',
    padding: '8px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600
  },
  btnDisabled: {
    background: '#bdbdbd', color: '#fff', border: 'none',
    padding: '8px 14px', borderRadius: 8, cursor: 'not-allowed', fontSize: 13
  },
  stock: { fontSize: 12, color: '#999' }
};

export default ProductCard;
