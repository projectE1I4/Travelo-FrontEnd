import React from 'react';
import Login from '../../components/auth/Login';
import { useAuth } from '../../hooks/useAuth';

const LoginPage = () => {
  const { login } = useAuth();

  return (
    <div className="grid-container">
      <Login onLogin={login} />
    </div>
  );
};

export default LoginPage;
