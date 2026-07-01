import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor - attach token
api.interceptors.request.use(
  (config) => {
    const token = 
      localStorage.getItem('pwwe_auth_token') || 
      sessionStorage.getItem('pwwe_auth_token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data on unauthorized
      localStorage.removeItem('pwwe_auth_token');
      localStorage.removeItem('pwwe_active_user');
      sessionStorage.removeItem('pwwe_auth_token');
      sessionStorage.removeItem('pwwe_active_user');
      
      // Only redirect if not already on auth pages
      if (!window.location.pathname.match(/^\/(login|signup|forgot-password|reset-password|verify-email)/)) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;