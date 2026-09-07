import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const u = username.trim().toLowerCase();

    let userData = null;
    let userToken = '';

    if (u === 'admin' && password === 'admin123') {
      userData = { username: 'admin', role: 'admin' };
      userToken = 'token-fiktiv-admin-123';
    } else if ((u === 'staf' || u === 'staff') && (password === 'staf123' || password === 'staff123')) {
      userData = { username: 'staf', role: 'staff' };
      userToken = 'token-fiktiv-staf-123';
    } else {
      setError('Username ose password gabim!');
      return;
    }

    try {
      // 1. Ruajmë të dhënat direkt te localStorage për siguri
      localStorage.setItem('token', userToken);
      localStorage.setItem('user', JSON.stringify(userData));

      // 2. Thërrasim funksionin e Auth
      if (typeof login === 'function') {
        login(userData, userToken);
      }

      // 3. Kalojmë automatikisht te Dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('Gabim gjatë login-it:', err);
      setError('Ndodhi një gabim gjatë kyçjes.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h3 className="login-title">Welcome</h3>
        <p className="login-subtitle">Log in to manage inventory</p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit} autoComplete="off">
          <div style={{ marginBottom: '16px', width: '100%' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#475569', fontWeight: '500' }}>
              Username
            </label>
            <Input 
              type="text" 
              name="username_field"
              autoComplete="off"
              placeholder="admin / staf"
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>

          <div style={{ marginBottom: '24px', width: '100%' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#475569', fontWeight: '500' }}>
              Password
            </label>
            <Input 
              type="password" 
              name="password_field"
              autoComplete="new-password"
              placeholder="••••••••"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <Button type="submit" variant="submit">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}