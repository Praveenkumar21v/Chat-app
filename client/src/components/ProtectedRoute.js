import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.user.token);

  return token ? children : <Navigate to="/email" />;
};

export default ProtectedRoute;