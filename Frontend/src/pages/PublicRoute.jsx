import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ element, restricted, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.user.currentUser);

  if (isAuthenticated && restricted) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default PublicRoute;
