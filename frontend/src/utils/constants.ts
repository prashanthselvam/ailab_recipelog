import { RouteConfig } from '@/types/common';

// API Configuration
export const API_BASE_URL = 'http://localhost:8001/api';
export const DJANGO_MEDIA_URL = 'http://localhost:8001/media';

// Authentication
export const TOKEN_STORAGE_KEY = 'access_token';
export const REFRESH_TOKEN_STORAGE_KEY = 'refresh_token';
export const USER_STORAGE_KEY = 'user';

// Pagination
export const DEFAULT_PAGE_SIZE = 20;

// File Upload
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;

// Recipe Rating
export const MIN_RATING = 1;
export const MAX_RATING = 5;

// Search
export const SEARCH_DEBOUNCE_DELAY = 300; // milliseconds

// Routes
export const ROUTES: RouteConfig = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  RECIPES: '/recipes',
  SEARCH: '/search',
} as const;

// Additional route patterns for dynamic routes
export const DYNAMIC_ROUTES = {
  RECIPE_DETAIL: '/recipes/:id',
  RECIPE_CREATE: '/recipes/create',
  RECIPE_EDIT: '/recipes/:id/edit',
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Form validation
export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 30,
} as const;
