import React, { useState, useEffect } from 'react';
import './App.css';
import OptimizedDashboard from './components/Dashboard/OptimizedDashboard';
import Auth from './components/Auth/Auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'customer' | 'vendor' | 'admin';
  isAuthenticated: boolean;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté (localStorage)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {user && user.isAuthenticated ? (
        <OptimizedDashboard user={user} onLogout={handleLogout} />
      ) : (
        <Auth onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;