import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.user.token) || localStorage.getItem('token');  // Check both Redux and localStorage

  if (!token) {
    return <Navigate to="/email" />;  // Redirect to login if token doesn't exist
  }

  return children;
};

export default ProtectedRoute;
