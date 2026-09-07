import { useState, useEffect } from 'react';
import API from '../api';

interface User {
  id?: number;
  email?: string;
  name?: string;
  role?: string;
  [key: string]: any;
}

export const useAuth = () => {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        setUser(null);
      }
    }
  }, [token]);

const login = async (credentials: { email?: string; username?: string }) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await API.post('/auth/login', credentials);
      const { accessToken, access_token, user: userData } = response.data;
      
      // NestJS zakonisht kthen access_token ose accessToken
      const authToken = accessToken || access_token || response.data.token;

      if (authToken) {
        localStorage.setItem('token', authToken);
        setToken(authToken);

        if (userData) {
          localStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);
        }
        return true;
      }
      return false;
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Identifikimi dështoi. Kontrolloni të dhënat.';
      setError(Array.isArray(msg) ? msg[0] : msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return { user, token, isAuthenticated: !!token, loading, login, logout };
};