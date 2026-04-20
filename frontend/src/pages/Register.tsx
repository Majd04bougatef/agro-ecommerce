import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password, role);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🌿 Inscription</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Nom complet</label>
          <input
            type="text" value={name} onChange={e => setName(e.target.value)}
            required style={styles.input} placeholder="Jean Dupont"
          />
          <label style={styles.label}>Email</label>
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            required style={styles.input} placeholder="votre@email.com"
          />
          <label style={styles.label}>Mot de passe</label>
          <input
            type="password" value={password} onChange={e => setPassword(e.target.value)}
            required minLength={6} style={styles.input} placeholder="Min. 6 caractères"
          />
          <label style={styles.label}>Je suis</label>
          <select value={role} onChange={e => setRole(e.target.value)} style={styles.input}>
            <option value="buyer">Acheteur</option>
            <option value="farmer">Agriculteur</option>
          </select>
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" disabled={loading} style={styles.btn}>
            {loading ? 'Inscription...' : 'S\'inscrire'}
          </button>
        </form>
        <p style={styles.link}>
          Déjà un compte ? <Link to="/login" style={{ color: '#4caf50' }}>Se connecter</Link>
        </p>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: 32 },
  card: {
    background: '#fff', borderRadius: 16, padding: '40px 36px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.10)', width: '100%', maxWidth: 420
  },
  title: { fontSize: 26, fontWeight: 700, color: '#1b5e20', textAlign: 'center', marginBottom: 28 },
  form: { display: 'flex', flexDirection: 'column', gap: 12 },
  label: { fontSize: 14, fontWeight: 600, color: '#444' },
  input: {
    padding: '12px 14px', borderRadius: 8, border: '1.5px solid #ddd',
    fontSize: 15, outline: 'none'
  },
  error: { color: '#e53935', fontSize: 13 },
  btn: {
    background: '#2e7d32', color: '#fff', border: 'none',
    padding: '14px', borderRadius: 8, cursor: 'pointer', fontSize: 16, fontWeight: 700, marginTop: 8
  },
  link: { textAlign: 'center', marginTop: 16, fontSize: 14, color: '#666' }
};

export default Register;
