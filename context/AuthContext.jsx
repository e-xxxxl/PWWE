import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const token = 
        localStorage.getItem('pwwe_auth_token') || 
        sessionStorage.getItem('pwwe_auth_token');
      
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await api.get('/auth/me');
      setUser(response.data.user);
    } catch (error) {
      console.error('Load user error:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password, rememberMe = false) => {
    const response = await api.post('/auth/login', { email, password });
    const { user: userData, token } = response.data;
    
    if (rememberMe) {
      localStorage.setItem('pwwe_auth_token', token);
      localStorage.setItem('pwwe_active_user', JSON.stringify(userData));
    } else {
      sessionStorage.setItem('pwwe_auth_token', token);
      sessionStorage.setItem('pwwe_active_user', JSON.stringify(userData));
    }
    
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('pwwe_auth_token');
    localStorage.removeItem('pwwe_active_user');
    sessionStorage.removeItem('pwwe_auth_token');
    sessionStorage.removeItem('pwwe_active_user');
    setUser(null);
    navigate('/login');
  };

  const isAdmin = user?.role === 'admin' || user?.role === 'super-admin';
  const isSuperAdmin = user?.role === 'super-admin';

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout, isAdmin, isSuperAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};