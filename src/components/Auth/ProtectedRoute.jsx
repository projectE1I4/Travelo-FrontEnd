import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === undefined) {
    return <div>Loading...</div>; // 인증 상태를 확인하는 동안 로딩 표시
  }

  if (!isAuthenticated) {
    return <Navigate to="/users/login" />;
  }

  return children;
};

export default ProtectedRoute;
