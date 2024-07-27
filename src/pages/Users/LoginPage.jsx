import React, { useEffect, useState } from 'react';
import Login from '../../components/auth/Login';
import { useAuth } from '../../hooks/useAuth';
import { useLocation } from 'react-router-dom';
import LoginErrorModal from './LoginErrorModal';

const LoginPage = () => {
  const { login } = useAuth();

  const location = useLocation();
  const show = location.state?.show;
  const username = location.state?.username;
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (show) {
      setShowModal(true);
    }
  }, [show]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="grid-container">
      <Login onLogin={login} />
      <LoginErrorModal
        show={showModal}
        onClose={() => setShowModal(false)}
        username={username}
      />
    </div>
  );
};

export default LoginPage;
