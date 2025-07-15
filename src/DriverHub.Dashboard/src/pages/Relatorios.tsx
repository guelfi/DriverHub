import React from 'react';

const Relatorios = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Relatórios</h1>
      <p className="text-gray-700 dark:text-gray-300">Esta é a página de relatórios. Em breve, aqui você poderá gerar e visualizar diversos relatórios sobre as operações.</p>
      {/* Conteúdo mock para relatórios */}
      <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Relatórios Disponíveis (Mock)</h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
          <li>Relatório de Viagens por Período</li>
          <li>Relatório de Despesas por Motorista</li>
          <li>Relatório de Lucratividade</li>
        </ul>
      </div>
    </div>
  );
};

export default Relatorios;
