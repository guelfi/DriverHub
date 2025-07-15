import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Motoristas from './pages/Motoristas';
import Relatorios from './pages/Relatorios';
import DashboardLayout from './components/DashboardLayout'; // Importa o novo layout

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        
        {/* Rota pai para o Dashboard com layout */}
        <Route 
          path="/dashboard"
          element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />}
        >
          <Route index element={<Dashboard />} /> {/* Rota padrão para /dashboard */}
          <Route path="motoristas" element={<Motoristas />} />
          <Route path="relatorios" element={<Relatorios />} />
        </Route>

        {/* Redireciona qualquer outra rota para login ou dashboard */}
        <Route path="*" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
