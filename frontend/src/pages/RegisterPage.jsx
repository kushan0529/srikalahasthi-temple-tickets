import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return alert('Passwords do not match');
    setLoading(true);
    try {
      const { data } = await API.post('/auth/register', formData);
      if (data.success) {
        login(data.user, data.token);
        navigate('/');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(circle, #2a0010, #0d0005)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: 'white', padding: '3rem', borderRadius: '20px', width: '100%', maxWidth: '500px', boxShadow: '0 25px 50px rgba(0,0,0,0.5)', border: '2px solid var(--gold)', textAlign: 'center' }}>
        <span style={{ fontSize: '3rem' }}>🕉️</span>
        <h1 style={{ color: 'var(--maroon-deep)', fontSize: '1.8rem', marginTop: '1rem' }}>Devotee Registration</h1>
        <p className="telugu-font" style={{ color: 'var(--saffron)', fontSize: '1.1rem', marginBottom: '2rem' }}>భక్తుల నమోదు</p>
        
        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '15px' }}>
            <label className="nav-font" style={{ display: 'block', color: 'var(--maroon)', marginBottom: '5px', fontSize: '0.75rem' }}>FULL NAME</label>
            <input style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label className="nav-font" style={{ display: 'block', color: 'var(--maroon)', marginBottom: '5px', fontSize: '0.75rem' }}>EMAIL ADDRESS</label>
            <input style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label className="nav-font" style={{ display: 'block', color: 'var(--maroon)', marginBottom: '5px', fontSize: '0.75rem' }}>MOBILE NUMBER</label>
            <input style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} required value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label className="nav-font" style={{ display: 'block', color: 'var(--maroon)', marginBottom: '5px', fontSize: '0.75rem' }}>PASSWORD</label>
            <input style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
          </div>
          <div style={{ marginBottom: '25px' }}>
            <label className="nav-font" style={{ display: 'block', color: 'var(--maroon)', marginBottom: '5px', fontSize: '0.75rem' }}>CONFIRM PASSWORD</label>
            <input style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} type="password" required value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})} />
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '15px', background: 'var(--saffron)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem' }}>{loading ? 'REGISTERING...' : 'REGISTER'}</button>
        </form>
        
        <p style={{ marginTop: '2rem', color: '#666' }}>
          Already registered? <Link to="/login" style={{ color: 'var(--maroon)', fontWeight: 'bold', textDecoration: 'none' }}>Login Here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
