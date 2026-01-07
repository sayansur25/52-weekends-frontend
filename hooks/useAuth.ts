import { useEffect, useState } from 'react';

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'organizer' | 'participant' | 'resort_contact';
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('user');
      const storedRole = localStorage.getItem('userRole');

      if (token && storedUser && storedRole) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setRole(storedRole);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Failed to parse user data:', error);
          logout();
        }
      }
      setLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
  };

  return { user, role, loading, isAuthenticated, logout };
};
