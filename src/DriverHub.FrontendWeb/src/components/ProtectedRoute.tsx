import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authToken'); // Check for authentication token

  if (!isAuthenticated) {
    // User is not authenticated, redirect to login page
    return <Navigate to="/" replace />;
  }

  return <>{children}</>; // User is authenticated, render the children
};

export default ProtectedRoute;
