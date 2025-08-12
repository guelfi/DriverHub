import React from 'react';
import InfoCard from './Cards/InfoCard';
import { Calculator, BarChart, PieChart, Car } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const HomeScreenCards: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"> {/* Removed place-items-center */}
      <InfoCard
        title="Meu KM"
        description="Calcule seu KM ideal para a semana."
        icon={Calculator}
        onClick={() => navigate('/my-km')} // Link to placeholder
      />
      <InfoCard
        title="Análise de Resultado"
        description="Analise seus resultados diários ou por período."
        icon={BarChart}
        onClick={() => navigate('/analysis')} // Link to placeholder
      />
      <InfoCard
        title="Estatísticas"
        description="Veja suas estatísticas de desempenho."
        icon={PieChart}
        onClick={() => navigate('/statistics')} // Link to placeholder
      />
      <InfoCard
        title="Meu Veículo"
        description="Gerencie seu veículo."
        icon={Car}
        onClick={() => navigate('/vehicles')} // Link to placeholder
      />
    </div>
  );
};

export default HomeScreenCards;
