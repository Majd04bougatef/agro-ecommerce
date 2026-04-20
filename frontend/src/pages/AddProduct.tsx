import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { createProduct } from '../services/api';

const CATEGORIES = ['légumes', 'fruits', 'céréales', 'produits_laitiers', 'viandes'];
const UNITS = ['kg', 'unité', 'litre', 'pièce'];

const AddProduct: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: 'légumes',
    price: '',
    unit: 'kg',
    stock: '',
    description: '',
    imageUrl: '',
  });

  if (!isAuthenticated || user?.role !== 'farmer') {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <p style={{ color: '#e53935', textAlign: 'center', fontSize: 16 }}>
            ⚠️ Accès réservé aux agriculteurs
          </p>
          <button onClick={() => navigate('/')} style={styles.btnHome}>
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await createProduct({
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      });
      setSuccess(true);
      setFormData({ name: '', category: 'légumes', price: '', unit: 'kg', stock: '', description: '', imageUrl: '' });
      setTimeout(() => {
        navigate('/products');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erreur lors de la création du produit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🌾 Ajouter un produit</h1>

        {success && (
          <div style={styles.success}>
            ✅ Produit créé avec succès ! Redirection...
          </div>
        )}

        {error && (
          <div style={styles.errorBox}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Nom du produit *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="ex: Tomates Bio"
            style={styles.input}
          />

          <label style={styles.label}>Catégorie *</label>
          <select name="category" value={formData.category} onChange={handleChange} style={styles.input}>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>
                {cat.replace('_', ' ')}
              </option>
            ))}
          </select>

          <label style={styles.label}>Prix (€) *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            placeholder="2.50"
            step="0.01"
            min="0"
            style={styles.input}
          />

          <label style={styles.label}>Unité *</label>
          <select name="unit" value={formData.unit} onChange={handleChange} style={styles.input}>
            {UNITS.map(u => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>

          <label style={styles.label}>Stock *</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            placeholder="100"
            min="0"
            style={styles.input}
          />

          <label style={styles.label}>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Décrivez votre produit..."
            style={styles.textarea}
            rows={4}
          />

          <label style={styles.label}>URL de l'image</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            style={styles.input}
          />

          <button type="submit" disabled={loading} style={styles.btn}>
            {loading ? 'Création en cours...' : '✅ Créer le produit'}
          </button>
        </form>

        <button onClick={() => navigate('/products')} style={styles.btnBack}>
          ← Retour aux produits
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: { maxWidth: 600, margin: '0 auto', padding: '40px 32px', minHeight: '80vh' },
  card: { background: '#fff', borderRadius: 16, padding: '40px', boxShadow: '0 4px 24px rgba(0,0,0,0.10)' },
  title: { fontSize: 26, fontWeight: 700, color: '#1b5e20', textAlign: 'center', marginBottom: 28 },
  form: { display: 'flex', flexDirection: 'column', gap: 12 },
  label: { fontSize: 14, fontWeight: 600, color: '#444' },
  input: { padding: '12px 14px', borderRadius: 8, border: '1.5px solid #ddd', fontSize: 15, outline: 'none' },
  textarea: { padding: '12px 14px', borderRadius: 8, border: '1.5px solid #ddd', fontSize: 15, outline: 'none', fontFamily: 'inherit' },
  btn: {
    background: '#2e7d32', color: '#fff', border: 'none',
    padding: '14px', borderRadius: 8, cursor: 'pointer', fontSize: 16, fontWeight: 700, marginTop: 8
  },
  btnBack: {
    background: 'transparent', color: '#666', border: '1px solid #ddd',
    padding: '10px', borderRadius: 8, cursor: 'pointer', fontSize: 14, marginTop: 12
  },
  btnHome: {
    background: '#2e7d32', color: '#fff', border: 'none',
    padding: '12px 28px', borderRadius: 8, cursor: 'pointer', fontSize: 16, fontWeight: 700
  },
  success: {
    background: '#c8e6c9', color: '#1b5e20', padding: 12, borderRadius: 8, marginBottom: 16, fontSize: 14
  },
  errorBox: {
    background: '#ffcdd2', color: '#c62828', padding: 12, borderRadius: 8, marginBottom: 16, fontSize: 14
  }
};

export default AddProduct;
