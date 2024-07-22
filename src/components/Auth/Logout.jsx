import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const useLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      logout();
      navigate('/users/login');
    } catch (error) {
      console.error('error', error);
    }
  };
  return handleLogout;
};

export default useLogout;
