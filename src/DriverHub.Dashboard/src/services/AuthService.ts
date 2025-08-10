import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5217/api';

const login = async (email: string, password: string) => {
  console.log("Enviando para API:", { email, password });
  const response = await axios.post(`${API_URL}/Auth/login-admin`, {
    email,
    senha: password, // <-- Alterado para 'senha'
  });
  return response.data.token; // Retorna apenas o token
};

const AuthService = {
  login,
};

export default AuthService;
