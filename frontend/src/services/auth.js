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
      const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Login failed';
      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  // Register new user
  async register(userData) {
    try {
      const { email, password, passwordConfirm, firstName, lastName, username } = userData;

      const response = await api.post('/auth/register/', {
        username: username || email.split('@')[0], // Use email prefix if no username
        email,
        password,
        password_confirm: passwordConfirm,
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
      // Handle validation errors from Django
      let errorMessage = 'Registration failed';

      if (error.response?.data) {
        const errors = error.response.data;
        if (typeof errors === 'object') {
          // Extract first error message from validation errors
          const firstError = Object.values(errors)[0];
          if (Array.isArray(firstError)) {
            errorMessage = firstError[0];
          } else if (typeof firstError === 'string') {
            errorMessage = firstError;
          }
        } else if (typeof errors === 'string') {
          errorMessage = errors;
        }
      }

      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  // Logout user
  async logout() {
    try {
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        // Call logout endpoint to blacklist the token
        await api.post('/auth/logout/', {
          refresh: refreshToken,
        });
      }
    } catch (error) {
      // Even if logout API call fails, we still clear local storage
      console.error('Logout API error:', error);
    } finally {
      // Always clear local storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    }
  },

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('access_token');
    const user = localStorage.getItem('user');
    return !!(token && user);
  },

  // Get current user from localStorage
  getCurrentUser() {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  },

  // Get access token
  getAccessToken() {
    return localStorage.getItem('access_token');
  },

  // Get refresh token
  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  },

  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await api.put('/auth/profile/update/', profileData);

      const { user } = response.data;

      // Update user in localStorage
      localStorage.setItem('user', JSON.stringify(user));

      return { success: true, user };
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Profile update failed';
      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  // Change password
  async changePassword(currentPassword, newPassword) {
    try {
      await api.post('/auth/change-password/', {
        old_password: currentPassword,
        new_password: newPassword,
      });

      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Password change failed';
      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  // Get user profile
  async getProfile() {
    try {
      const response = await api.get('/auth/profile/');
      return { success: true, user: response.data };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch profile',
      };
    }
  },
};
