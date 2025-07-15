import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/AuthService';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<void>; // Altera a assinatura para refletir a chamada ao serviço
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

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password); // Chama o serviço de autenticação
      localStorage.setItem('adminUser', JSON.stringify(response)); // Armazena a resposta completa
      setIsAuthenticated(true);
      setUser(response); // Define o usuário com a resposta da API
    } catch (error) {
      console.error("Erro no AuthContext login:", error);
      throw error; // Propaga o erro para o componente de login
    }
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