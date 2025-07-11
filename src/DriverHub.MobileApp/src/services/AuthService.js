import axios from 'axios';

const API_URL = 'http://localhost:5217/api/Auth'; // TODO: Configure this based on environment

const getErrorMessage = (error) => {
  if (error.response) {
    // A requisição foi feita e o servidor respondeu com um status code
    // que cai fora do range de 2xx
    if (error.response.data && error.response.data.message) {
      console.log('getErrorMessage: Returning from data.message', error.response.data.message);
      return error.response.data.message;
    } else if (typeof error.response.data === 'string') {
      console.log('getErrorMessage: Returning from string data', error.response.data);
      return error.response.data;
    } else if (error.response.status === 401) {
      console.log('getErrorMessage: Returning default 401 message');
      return 'Credenciais inválidas.';
    } else if (error.response.status === 400) {
      // Handle ValidationProblemDetails
      if (error.response.data.errors) {
        let errorMessages = [];
        for (const key in error.response.data.errors) {
          if (error.response.data.errors.hasOwnProperty(key)) {
            errorMessages = errorMessages.concat(error.response.data.errors[key]);
          }
        }
        const finalMessage = errorMessages.join('\n');
        console.log('getErrorMessage: Returning validation errors', finalMessage);
        return finalMessage;
      }
      console.log('getErrorMessage: Returning default 400 message');
      return 'Requisição inválida. Verifique os dados informados.';
    }
  } else if (error.request) {
    // A requisição foi feita mas nenhuma resposta foi recebida
    console.log('getErrorMessage: Returning network error');
    return 'Sem resposta do servidor. Verifique sua conexão.';
  } else {
    // Alguma coisa acontenceu na configuração da requisição que disparou um Erro
    console.log('getErrorMessage: Returning generic error');
    return 'Erro inesperado. Tente novamente.';
  }
  console.log('getErrorMessage: Returning unknown error');
  return 'Ocorreu um erro desconhecido.';
};

const AuthService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      return { token: response.data.token, nome: response.data.nome, sobrenome: response.data.sobrenome };
    } catch (error) {
      console.log('AuthService.login: Error caught', error);
      throw new Error(getErrorMessage(error));
    }
  },

  register: async (nome, sobrenome, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        nome,
        sobrenome,
        email,
        password,
      });
      return true;
    } catch (error) {
      console.log('AuthService.register: Error caught', error);
      throw new Error(getErrorMessage(error));
    }
  },
};

export default AuthService;