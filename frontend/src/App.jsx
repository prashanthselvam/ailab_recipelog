import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import AuthStatus from './components/Auth/AuthStatus';
import { ROUTES } from './utils/constants';
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

// Placeholder components (will be implemented in later tasks)
const HomePage = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">Recipe Log - Home Page</h1>
    <AuthStatus />
  </div>
);
const LoginPage = () => <div>Login Page</div>;
const RegisterPage = () => <div>Register Page</div>;
const RecipesPage = () => <div>Recipes Page</div>;
const SearchPage = () => <div>Search Page</div>;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="app">
            <Routes>
              <Route path={ROUTES.HOME} element={<HomePage />} />
              <Route path={ROUTES.LOGIN} element={<LoginPage />} />
              <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
              <Route path={ROUTES.RECIPES} element={<RecipesPage />} />
              <Route path={ROUTES.SEARCH} element={<SearchPage />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
