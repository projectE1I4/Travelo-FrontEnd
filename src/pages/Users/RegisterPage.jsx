import React from 'react';
import Register from '../../components/Auth/Register';
import authService from '../../services/authService';

const RegisterPage = () => {
  const register = async (username, password, rePassword, tel) => {
    return await authService.register(username, password, rePassword, tel);
  };

  const mailcheck = async (username) => {
    return await authService.mailConfirm(username);
  };

  const verifycodecheck = async (username, verifyCode) => {
    return await authService.verifyCode(username, verifyCode);
  };

  return (
    <Register
      onRegister={register}
      onMailCheck={mailcheck}
      onVerifyCodeCheck={verifycodecheck}
    />
  );
};

export default RegisterPage;
