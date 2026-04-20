import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';

const CATEGORIES = ['tous', 'légumes', 'fruits', 'céréales', 'produits_laitiers', 'viandes'];

const Products: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'tous';

  useEffect(() => {
    setLoading(true);
    const cat = activeCategory === 'tous' ? undefined : activeCategory;
    getProducts(cat)
      .then(res => setProducts(res.data))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const selectCategory = (cat: string) => {
    if (cat === 'tous') setSearchParams({});
    else setSearchParams({ category: cat });
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Nos Produits Agricoles</h1>

      {/* Filtres */}
      <div style={styles.filters}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => selectCategory(cat)}
            style={activeCategory === cat ? styles.filterActive : styles.filter}
          >
            {cat.replace('_', ' ')}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={styles.loading}>Chargement...</div>
      ) : products.length === 0 ? (
        <div style={styles.empty}>Aucun produit dans cette catégorie.</div>
      ) : (
        <div style={styles.grid}>
          {products.map(p => <ProductCard key={p._id} product={p} />)}
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: { maxWidth: 1200, margin: '0 auto', padding: '40px 32px' },
  title: { fontSize: 32, fontWeight: 700, color: '#1b5e20', marginBottom: 24 },
  filters: { display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 },
  filter: {
    padding: '8px 18px', borderRadius: 20, border: '2px solid #4caf50',
    background: '#fff', color: '#4caf50', cursor: 'pointer', fontWeight: 600, fontSize: 14
  },
  filterActive: {
    padding: '8px 18px', borderRadius: 20, border: '2px solid #4caf50',
    background: '#4caf50', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 14
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: 24
  },
  loading: { textAlign: 'center', padding: 60, color: '#666', fontSize: 18 },
  empty: { textAlign: 'center', padding: 60, color: '#999', fontSize: 18 }
};

export default Products;
