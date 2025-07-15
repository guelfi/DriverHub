import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5217/api';

const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/Auth/login-admin`, {
            email,
            password,
        });
        return response.data; // Retorna os dados para o AuthContext gerenciar
    } catch (error: any) {
        throw error.response?.data || new Error('Erro desconhecido ao fazer login');
    }
};

const logout = () => {
    localStorage.removeItem('adminUser');
};

const getCurrentUser = () => {
    const userStr = localStorage.getItem('adminUser');
    if (userStr) {
        return JSON.parse(userStr);
    }
    return null;
};

const AuthService = {
    login,
    logout,
    getCurrentUser,
};

export default AuthService;
