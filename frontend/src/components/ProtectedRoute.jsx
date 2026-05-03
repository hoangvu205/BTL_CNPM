import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
export const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.check) {
          setIsAuthenticated(true);
          setUser(response.data.user);
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const AdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setIsAdmin(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/admin/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.check) {
          setIsAdmin(true);
          setUser(response.data.user);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Admin check failed:', error);
        setIsAdmin(false);
        if (error.response?.status === 403) {
          alert('Access denied: Admin privileges required');
          navigate('/');
        }
      }
    };

    checkAdmin();
  }, [navigate]);

  if (isAdmin === null) {
    return <div className="text-center mt-5">Verifying admin access...</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  return children;
};

// Hook to get current user info
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.check) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Failed to get user:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/login';
  };

  return { user, loading, logout };
};