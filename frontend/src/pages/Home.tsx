import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';

const CATEGORIES = ['légumes', 'fruits', 'céréales', 'produits_laitiers', 'viandes'];
const CAT_EMOJI: Record<string, string> = {
  légumes: '🥦', fruits: '🍎', céréales: '🌾', produits_laitiers: '🥛', viandes: '🥩'
};

const Home: React.FC = () => {
  const [featured, setFeatured] = useState<any[]>([]);

  useEffect(() => {
    getProducts().then(res => setFeatured(res.data.slice(0, 4))).catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>🌾 Produits Agricoles Frais</h1>
          <p style={styles.heroSub}>
            Commandez directement auprès des agriculteurs locaux. Qualité garantie, livraison rapide.
          </p>
          <Link to="/products" style={styles.heroBtn}>Voir tous les produits</Link>
        </div>
      </div>

      {/* Catégories */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Nos catégories</h2>
        <div style={styles.categories}>
          {CATEGORIES.map(cat => (
            <Link key={cat} to={`/products?category=${cat}`} style={styles.catCard}>
              <span style={styles.catEmoji}>{CAT_EMOJI[cat]}</span>
              <span style={styles.catName}>{cat.replace('_', ' ')}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Produits en vedette */}
      {featured.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Produits en vedette</h2>
          <div style={styles.grid}>
            {featured.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Link to="/products" style={styles.heroBtn}>Voir tout</Link>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  hero: {
    background: 'linear-gradient(135deg, #1b5e20 0%, #4caf50 100%)',
    padding: '80px 32px', textAlign: 'center', color: '#fff'
  },
  heroContent: { maxWidth: 600, margin: '0 auto' },
  heroTitle: { fontSize: 42, fontWeight: 800, marginBottom: 16 },
  heroSub: { fontSize: 18, opacity: 0.9, marginBottom: 32, lineHeight: 1.6 },
  heroBtn: {
    background: '#fff', color: '#2e7d32', padding: '14px 32px',
    borderRadius: 30, textDecoration: 'none', fontWeight: 700, fontSize: 16
  },
  section: { maxWidth: 1200, margin: '0 auto', padding: '48px 32px' },
  sectionTitle: { fontSize: 28, fontWeight: 700, color: '#1b5e20', marginBottom: 24 },
  categories: { display: 'flex', gap: 16, flexWrap: 'wrap' },
  catCard: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    background: '#fff', borderRadius: 12, padding: '24px 32px',
    textDecoration: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s', flex: '1 1 120px'
  },
  catEmoji: { fontSize: 40, marginBottom: 8 },
  catName: { color: '#2e7d32', fontWeight: 600, textTransform: 'capitalize' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: 24
  }
};

export default Home;
