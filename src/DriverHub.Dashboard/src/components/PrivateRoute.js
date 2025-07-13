import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // Verifica se há um token no localStorage
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
