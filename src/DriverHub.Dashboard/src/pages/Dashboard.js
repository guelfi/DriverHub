import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [motoristCount, setMotoristCount] = useState(null);
  const [totalProfitLoss, setTotalProfitLoss] = useState(null);
  const [dailySummary, setDailySummary] = useState([]);
  const [error, setError] = useState('');

  const API_BASE_URL = 'http://192.168.15.119:5217/api';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          setError('Token de autenticação não encontrado.');
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Fetch Motorist Count
        const motoristCountResponse = await axios.get(`${API_BASE_URL}/Admin/motorist-count`, { headers });
        setMotoristCount(motoristCountResponse.data.motoristCount);

        // Fetch Financial Summary (example for a fixed date range)
        const today = new Date();
        const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        const financialSummaryResponse = await axios.get(`${API_BASE_URL}/Admin/financial-summary`, {
          params: {
            motoristaId: '00000000-0000-0000-0000-000000000000', // Replace with actual admin motoristaId or fetch all
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          },
          headers,
        });
        setTotalProfitLoss(financialSummaryResponse.data.totalProfitLoss);

        // Fetch Daily Financial Summary (example for a fixed date range)
        const dailyFinancialSummaryResponse = await axios.get(`${API_BASE_URL}/Admin/daily-financial-summary`, {
          params: {
            motoristaId: '00000000-0000-0000-0000-000000000000', // Replace with actual admin motoristaId or fetch all
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          },
          headers,
        });
        setDailySummary(dailyFinancialSummaryResponse.data);

      } catch (err) {
        console.error('Erro ao buscar dados do dashboard:', err);
        setError('Erro ao carregar dados do dashboard. Verifique o console para mais detalhes.');
      }
    };

    fetchData();
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

      {totalProfitLoss !== null ? (
        <p>Lucro/Prejuízo Total (Mês Atual): <strong>R$ {totalProfitLoss.toFixed(2)}</strong></p>
      ) : (
        <p>Carregando resumo financeiro...</p>
      )}

      <h3>Resumo Financeiro Diário</h3>
      {dailySummary.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Receita</th>
              <th>Despesa</th>
            </tr>
          </thead>
          <tbody>
            {dailySummary.map((item, index) => (
              <tr key={index}>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>R$ {item.receita.toFixed(2)}</td>
                <td>R$ {item.despesa.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Carregando resumo diário ou nenhum dado disponível.</p>
      )}
    </div>
  );
}

export default Dashboard;
