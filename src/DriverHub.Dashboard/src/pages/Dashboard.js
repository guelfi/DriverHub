import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [motoristCount, setMotoristCount] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMotoristCount = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          setError('Token de autenticação não encontrado.');
          return;
        }

        const response = await axios.get('http://192.168.15.119:5217/api/Admin/motorist-count', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMotoristCount(response.data.motoristCount);
      } catch (err) {
        console.error('Erro ao buscar contagem de motoristas:', err);
        setError('Erro ao carregar dados do dashboard.');
      }
    };

    fetchMotoristCount();
  }, []);

  return (
    <div>
      <h2>Dashboard Administrativo</h2>
      <p>Bem-vindo ao painel de controle do DriverHub!</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {motoristCount !== null ? (
        <p>Número total de motoristas cadastrados: <strong>{motoristCount}</strong></p>
      ) : (
        <p>Carregando número de motoristas...</p>
      )}
    </div>
  );
}

export default Dashboard;