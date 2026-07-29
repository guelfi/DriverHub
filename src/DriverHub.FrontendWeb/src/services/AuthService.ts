import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/driverhub-api/api';

const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/Auth/login`, {
    email,
    senha: password,
  });
  return response.data;
};

const register = async (nome: string, sobrenome: string, email: string, password: string) => {
  const response = await axios.post(`${API_URL}/Auth/register`, {
    nome,
    sobrenome,
    email,
    senha: password,
  });
  return response.data;
};

const AuthService = {
  login,
  register,
};

export default AuthService;
