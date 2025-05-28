import { useAuth } from '../../contexts/AuthContext';

const AuthStatus = () => {
  const { user, isAuthenticated, isLoading, error, logout } = useAuth();

  if (isLoading) {
    return <div>Loading authentication status...</div>;
  }

  return (
    <div className="auth-status p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-2">Authentication Status</h3>
      
      {error && (
        <div className="text-red-600 mb-2">
          Error: {error}
        </div>
      )}
      
      <div className="space-y-2">
        <p>
          <strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}
        </p>
        
        {user && (
          <div>
            <p><strong>User:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
          </div>
        )}
        
        {isAuthenticated && (
          <button
            onClick={logout}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthStatus; 