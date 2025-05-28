// User types
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  date_joined: string;
  profile: UserProfile;
}

export interface UserProfile {
  bio: string;
  avatar: string | null;
  created_at: string;
  updated_at: string;
}

// Authentication request/response types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username?: string;
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: User;
  access: string;
  refresh: string;
  message: string;
}

export interface TokenRefreshRequest {
  refresh: string;
}

export interface TokenRefreshResponse {
  access: string;
  refresh?: string;
}

// Service response types
export interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface AuthServiceResponse {
  success: boolean;
  user?: User;
  error?: string;
}

// Auth context types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<AuthServiceResponse>;
  register: (userData: RegisterRequest) => Promise<AuthServiceResponse>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
  clearError: () => void;
}

// Auth actions
export type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User } }
  | { type: 'LOGIN_FAILURE'; payload: { error: string } }
  | { type: 'REGISTER_START' }
  | { type: 'REGISTER_SUCCESS'; payload: { user: User } }
  | { type: 'REGISTER_FAILURE'; payload: { error: string } }
  | { type: 'LOGOUT' }
  | { type: 'LOAD_USER'; payload: { user: User | null } }
  | { type: 'UPDATE_USER'; payload: { user: User } }
  | { type: 'CLEAR_ERROR' };

// Form types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  username?: string;
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
}
