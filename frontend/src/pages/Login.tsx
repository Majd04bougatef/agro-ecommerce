import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🌾 Connexion</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Email</label>
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            required style={styles.input} placeholder="votre@email.com"
          />
          <label style={styles.label}>Mot de passe</label>
          <input
            type="password" value={password} onChange={e => setPassword(e.target.value)}
            required style={styles.input} placeholder="••••••••"
          />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" disabled={loading} style={styles.btn}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
        <p style={styles.link}>
          Pas encore de compte ? <Link to="/register" style={{ color: '#4caf50' }}>S'inscrire</Link>
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

export default Login;
