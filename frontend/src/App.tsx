import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import PublicRoute from '@/components/Auth/PublicRoute';
import LoginForm from '@/components/Auth/LoginForm';
import RegisterForm from '@/components/Auth/RegisterForm';
import AuthStatus from '@/components/Auth/AuthStatus';
import { ROUTES } from '@/utils/constants';
import './App.css';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Home page component (protected)
const HomePage: React.FC = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Welcome to Recipe Log</h1>
        <p className="mt-4 text-xl text-gray-600">Your personal recipe collection and discovery platform</p>
      </div>

      <div className="mt-12">
        <AuthStatus />
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600">🚧 More features coming soon! This is the foundation phase.</p>
      </div>
    </div>
  </div>
);

// Placeholder components for future implementation
const RecipesPage: React.FC = () => (
  <ProtectedRoute>
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Recipes Page</h1>
        <p className="mt-2 text-gray-600">Coming soon in Phase 2!</p>
      </div>
    </div>
  </ProtectedRoute>
);

const SearchPage: React.FC = () => (
  <ProtectedRoute>
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Search Page</h1>
        <p className="mt-2 text-gray-600">Coming soon in Phase 2!</p>
      </div>
    </div>
  </ProtectedRoute>
);

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="app">
            <Routes>
              {/* Protected routes */}
              <Route
                path={ROUTES.HOME}
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route path={ROUTES.RECIPES} element={<RecipesPage />} />
              <Route path={ROUTES.SEARCH} element={<SearchPage />} />

              {/* Public routes (redirect to home if authenticated) */}
              <Route
                path={ROUTES.LOGIN}
                element={
                  <PublicRoute>
                    <LoginForm />
                  </PublicRoute>
                }
              />
              <Route
                path={ROUTES.REGISTER}
                element={
                  <PublicRoute>
                    <RegisterForm />
                  </PublicRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
