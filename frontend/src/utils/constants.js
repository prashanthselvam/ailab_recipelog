// API Configuration
export const API_BASE_URL = 'http://localhost:8000/api';
export const DJANGO_MEDIA_URL = 'http://localhost:8000/media';

// Authentication
export const TOKEN_STORAGE_KEY = 'access_token';
export const REFRESH_TOKEN_STORAGE_KEY = 'refresh_token';
export const USER_STORAGE_KEY = 'user';

// Pagination
export const DEFAULT_PAGE_SIZE = 20;

// File Upload
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Recipe Rating
export const MIN_RATING = 1;
export const MAX_RATING = 5;

// Search
export const SEARCH_DEBOUNCE_DELAY = 300; // milliseconds

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  RECIPES: '/recipes',
  RECIPE_DETAIL: '/recipes/:id',
  RECIPE_CREATE: '/recipes/create',
  RECIPE_EDIT: '/recipes/:id/edit',
  SEARCH: '/search',
};
