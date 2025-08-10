import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean; // Adiciona o estado de carregamento
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Começa como true

  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    if (storedToken) {
      try {
        const decodedUser = jwtDecode(storedToken);
        console.log("Token decodificado (useEffect):", decodedUser);
        setToken(storedToken);
        setUser(decodedUser);
      } catch (error) {
        console.error("Erro ao decodificar token (useEffect):", error);
        localStorage.removeItem('token'); // Limpa token inválido
      }
    }
    setIsLoading(false); // Termina o carregamento após verificar o localStorage
  }, []);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('adminToken', newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('adminToken');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isLoading }}>
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
