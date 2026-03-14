import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element }) => {
  const { user } = useSelector((state) => state.auth);

  // Authentication disabled for now
  return element;
};

export default ProtectedRoute;
