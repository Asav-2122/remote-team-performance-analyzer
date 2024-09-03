import axios from 'axios';

const API_URL = 'http://localhost:5001/api'; // Adjust this URL if your backend is hosted elsewhere

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string) => {
  if (token) {
    api.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete api.defaults.headers.common['x-auth-token'];
  }
};

export const register = (userData: { username: string; email: string; password: string }) =>
  api.post('/auth/register', userData);

export const login = (credentials: { username: string; password: string }) =>
  api.post('/auth/login', credentials);

export const getDashboardData = () => api.get('/dashboard');

export default api;