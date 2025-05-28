import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/utils/constants';
import { RegisterRequest, AuthServiceResponse } from '@/types/auth';

interface UseAuthActionsReturn {
  handleLogin: (email: string, password: string, redirectTo?: string) => Promise<AuthServiceResponse>;
  handleRegister: (userData: RegisterRequest, redirectTo?: string) => Promise<AuthServiceResponse>;
  handleLogout: (redirectTo?: string) => Promise<AuthServiceResponse>;
  isLoading: boolean;
}

export const useAuthActions = (): UseAuthActionsReturn => {
  const { login, register, logout, clearError } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async (
    email: string,
    password: string,
    redirectTo: string = ROUTES.HOME
  ): Promise<AuthServiceResponse> => {
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

  const handleRegister = async (
    userData: RegisterRequest,
    redirectTo: string = ROUTES.HOME
  ): Promise<AuthServiceResponse> => {
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

  const handleLogout = async (redirectTo: string = ROUTES.LOGIN): Promise<AuthServiceResponse> => {
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
