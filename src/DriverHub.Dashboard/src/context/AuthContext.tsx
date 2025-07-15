import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/AuthService';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (token: string, user: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser && currentUser.token) {
      setIsAuthenticated(true);
      setUser(currentUser);
    }
  }, []);

  const login = (token: string, userData: any) => {
    localStorage.setItem('adminUser', JSON.stringify({ ...userData, token }));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
