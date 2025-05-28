import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/constants';

export const useAuthActions = () => {
  const { login, register, logout, clearError } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email, password, redirectTo = ROUTES.HOME) => {
    setIsLoading(true);
    clearError();

    try {
      const result = await login(email, password);

      if (result.success) {
        navigate(redirectTo);
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (userData, redirectTo = ROUTES.HOME) => {
    setIsLoading(true);
    clearError();

    try {
      const result = await register(userData);

      if (result.success) {
        navigate(redirectTo);
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async (redirectTo = ROUTES.LOGIN) => {
    setIsLoading(true);

    try {
      await logout();
      navigate(redirectTo);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, redirect to login
      navigate(redirectTo);
      return { success: false, error: 'Logout failed' };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleLogin,
    handleRegister,
    handleLogout,
    isLoading,
  };
};
