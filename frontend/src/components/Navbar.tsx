import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { itemCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>🌾 Agro E-Commerce</Link>
      <div style={styles.links}>
        <Link to="/products" style={styles.link}>Produits</Link>
        {isAuthenticated ? (
          <>
            {user?.role === 'farmer' && (
              <Link to="/add-product" style={styles.addBtn}>➕ Ajouter produit</Link>
            )}
            <span style={styles.welcome}>Bonjour, {user?.name}</span>
            <button onClick={handleLogout} style={styles.btn}>Déconnexion</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Connexion</Link>
            <Link to="/register" style={styles.link}>Inscription</Link>
          </>
        )}
        <Link to="/cart" style={styles.cartBtn}>
          🛒 {itemCount > 0 && <span style={styles.badge}>{itemCount}</span>}
        </Link>
      </div>
    </nav>
  );
};

const styles: Record<string, React.CSSProperties> = {
  nav: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '14px 32px', background: '#2e7d32', color: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
  },
  logo: { color: '#fff', textDecoration: 'none', fontSize: 22, fontWeight: 700 },
  links: { display: 'flex', alignItems: 'center', gap: 20 },
  link: { color: '#c8e6c9', textDecoration: 'none', fontSize: 15 },
  welcome: { color: '#c8e6c9', fontSize: 14 },
  btn: {
    background: 'transparent', border: '1px solid #c8e6c9', color: '#c8e6c9',
    padding: '6px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 14
  },
  addBtn: {
    color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 600,
    background: '#ff6f00', padding: '8px 14px', borderRadius: 6
  },
  cartBtn: { position: 'relative', color: '#fff', textDecoration: 'none', fontSize: 22 },
  badge: {
    position: 'absolute', top: -8, right: -8, background: '#ff5722',
    color: '#fff', borderRadius: '50%', width: 18, height: 18,
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11
  }
};

export default Navbar;
