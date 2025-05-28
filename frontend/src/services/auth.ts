import { AxiosError } from 'axios';
import api from './api';
import { User, RegisterRequest, AuthResponse, AuthServiceResponse, LoginRequest } from '@/types/auth';
import { TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from '@/utils/constants';

// Authentication service functions
export const authService = {
  // Login user
  async login(email: string, password: string): Promise<AuthServiceResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login/', {
        email,
        password,
      } as LoginRequest);

      const { access, refresh, user } = response.data;

      // Store tokens in localStorage
      localStorage.setItem(TOKEN_STORAGE_KEY, access);
      localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refresh);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));

      return { success: true, user };
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      const errorMessage = axiosError.response?.data?.error || axiosError.response?.data?.message || 'Login failed';
      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  // Register new user
  async register(userData: RegisterRequest): Promise<AuthServiceResponse> {
    try {
      const { email, password, passwordConfirm, firstName, lastName, username } = userData;

      const response = await api.post<AuthResponse>('/auth/register/', {
        username: username || email.split('@')[0], // Use email prefix if no username
        email,
        password,
        password_confirm: passwordConfirm,
        first_name: firstName,
        last_name: lastName,
      });

      const { access, refresh, user } = response.data;

      // Store tokens in localStorage
      localStorage.setItem(TOKEN_STORAGE_KEY, access);
      localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refresh);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));

      return { success: true, user };
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      // Handle validation errors from Django
      let errorMessage = 'Registration failed';

      if (axiosError.response?.data) {
        const errors = axiosError.response.data;
        if (typeof errors === 'object') {
          // Extract first error message from validation errors
          const firstError = Object.values(errors)[0];
          if (Array.isArray(firstError)) {
            errorMessage = firstError[0] as string;
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
  async logout(): Promise<void> {
    try {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);

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
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    const user = localStorage.getItem(USER_STORAGE_KEY);
    return !!(token && user);
  },

  // Get current user from localStorage
  getCurrentUser(): User | null {
    try {
      const userStr = localStorage.getItem(USER_STORAGE_KEY);
      return userStr ? (JSON.parse(userStr) as User) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  },

  // Get access token
  getAccessToken(): string | null {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  },

  // Get refresh token
  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
  },

  // Update user profile
  async updateProfile(profileData: Partial<User>): Promise<AuthServiceResponse> {
    try {
      const response = await api.put<{ user: User }>('/auth/profile/update/', profileData);

      const { user } = response.data;

      // Update user in localStorage
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));

      return { success: true, user };
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      const errorMessage =
        axiosError.response?.data?.error || axiosError.response?.data?.message || 'Profile update failed';
      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  // Change password
  async changePassword(currentPassword: string, newPassword: string): Promise<AuthServiceResponse> {
    try {
      await api.post('/auth/change-password/', {
        old_password: currentPassword,
        new_password: newPassword,
      });

      return { success: true };
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      const errorMessage =
        axiosError.response?.data?.error || axiosError.response?.data?.message || 'Password change failed';
      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  // Get user profile
  async getProfile(): Promise<AuthServiceResponse> {
    try {
      const response = await api.get<User>('/auth/profile/');
      return { success: true, user: response.data };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch profile',
      };
    }
  },
};
