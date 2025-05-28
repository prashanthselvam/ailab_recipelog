import api from './api';

// Authentication service functions
export const authService = {
  // Login user
  async login(email, password) {
    try {
      const response = await api.post('/auth/login/', {
        email,
        password,
      });

      const { access, refresh, user } = response.data;

      // Store tokens in localStorage
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('user', JSON.stringify(user));

      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
      };
    }
  },

  // Register new user
  async register(email, password, firstName, lastName) {
    try {
      const response = await api.post('/auth/register/', {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      });

      const { access, refresh, user } = response.data;

      // Store tokens in localStorage
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('user', JSON.stringify(user));

      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed',
      };
    }
  },

  // Logout user
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  },

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('access_token');
    return !!token;
  },

  // Get current user from localStorage
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Get access token
  getAccessToken() {
    return localStorage.getItem('access_token');
  },

  // Get refresh token
  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  },
};
