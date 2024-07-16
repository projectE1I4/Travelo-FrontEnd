import React from 'react';
import Home from '../components/Home/Home';
import { useAuth } from '../hooks/useAuth';

const HomePage = () => {
  const { logout } = useAuth();

  return <Home onLogout={logout} />;
};

export default HomePage;
