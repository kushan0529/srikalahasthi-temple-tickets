import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post('/auth/login', { email, password });
      if (data.success) {
        login(data.user, data.token);
        navigate('/');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(circle, #2a0010, #0d0005)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: 'white', padding: '3rem', borderRadius: '20px', width: '100%', maxWidth: '450px', boxShadow: '0 25px 50px rgba(0,0,0,0.5)', border: '2px solid var(--gold)', textAlign: 'center' }}>
        <span style={{ fontSize: '4rem' }}>🕉️</span>
        <h1 style={{ color: 'var(--maroon-deep)', fontSize: '2rem', marginTop: '1rem' }}>Devotee Login</h1>
        <p className="telugu-font" style={{ color: 'var(--saffron)', fontSize: '1.2rem', marginBottom: '2rem' }}>భక్తుల లాగిన్</p>
        
        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '20px' }}>
            <label className="nav-font" style={{ display: 'block', color: 'var(--maroon)', marginBottom: '8px', fontSize: '0.8rem' }}>EMAIL ADDRESS</label>
            <input style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} type="email" required value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div style={{ marginBottom: '30px' }}>
            <label className="nav-font" style={{ display: 'block', color: 'var(--maroon)', marginBottom: '8px', fontSize: '0.8rem' }}>PASSWORD</label>
            <input style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} type="password" required value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '15px', background: 'var(--saffron)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem' }}>{loading ? 'LOGGING IN...' : 'LOGIN'}</button>
        </form>
        
        <p style={{ marginTop: '2rem', color: '#666' }}>
          New to Temple Portal? <Link to="/register" style={{ color: 'var(--maroon)', fontWeight: 'bold', textDecoration: 'none' }}>Register Here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
