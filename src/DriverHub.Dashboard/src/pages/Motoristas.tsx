import React from 'react';

const Motoristas = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Motoristas</h1>
      <p className="text-gray-700 dark:text-gray-300">Esta é a página de gerenciamento de motoristas. Em breve, aqui você poderá visualizar, adicionar e editar informações sobre os motoristas cadastrados.</p>
      {/* Conteúdo mock para motoristas */}
      <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Lista de Motoristas (Mock)</h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
          <li>João Silva - Ativo</li>
          <li>Maria Oliveira - Em Férias</li>
          <li>Pedro Souza - Inativo</li>
        </ul>
      </div>
    </div>
  );
};

export default Motoristas;
