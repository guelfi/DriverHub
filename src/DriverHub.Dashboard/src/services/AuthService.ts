import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/Auth`;

const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login-admin`, {
    email,
    password,
  });
  return response.data.token; // Retorna apenas o token
};

const AuthService = {
  login,
};

export default AuthService;
