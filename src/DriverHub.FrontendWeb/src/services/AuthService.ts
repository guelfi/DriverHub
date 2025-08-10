const API_URL = 'http://192.168.15.119:5217/api/auth'

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Falha no login');
  }

  return response.json();
};

export const register = async (nome: string, sobrenome: string, email: string, password: string) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nome, sobrenome, email, password }),
  });

  if (!response.ok) {
    throw new Error('Falha no registro');
  }

  return response.json();
};
