import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminPublicRoute = ({ element, restricted }) => {
  const isAuthenticated = useSelector((state) => state.admin.currentAdmin);
  const location = useLocation();

  if (isAuthenticated && restricted) {
    return <Navigate to="/admin/home" state={{ from: location }} replace />;
  }

  return element;
};

export default AdminPublicRoute;