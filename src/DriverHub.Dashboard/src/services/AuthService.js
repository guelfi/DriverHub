import axios from 'axios';

const API_URL = 'http://192.168.15.119:5217/api/Auth';

const AuthService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      // Assuming the API returns a token and user info
      localStorage.setItem('adminToken', response.data.token);
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('adminToken');
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('adminToken');
    // In a real app, you would decode the token or fetch user data from an API
    // For simplicity, we'll just return true if a token exists
    return token ? true : null;
  },
};

export default AuthService;
