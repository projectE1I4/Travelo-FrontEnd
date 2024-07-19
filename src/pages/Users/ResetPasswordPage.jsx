import React from 'react';
import ResetPassword from '../../components/Auth/ResetPassword';
import mailCheckService from '../../services/mailCheckService';
import authService from '../../services/authService';

const ResetPasswordPage = () => {
  const mailcheck = async (username) => {
    try {
      console.log('mailcheck called with username:', username); // 디버깅용 로그
      const response = await mailCheckService.mailConfirm(username);
      console.log('Mail check response:', response); // 디버깅용 로그
      return response;
    } catch (error) {
      console.error('Mail check error:', error); // 오류 로그
      return { success: false };
    }
  };

  const verifycodecheck = async (username, verifyCode) => {
    try {
      console.log(
        'verifycodecheck called with username:',
        username,
        'and verifyCode:',
        verifyCode
      ); // 디버깅용 로그
      const response = await mailCheckService.verifyCode(username, verifyCode);
      console.log('Verify code check response:', response); // 디버깅용 로그
      return response;
    } catch (error) {
      console.error('Verify code check error:', error); // 오류 로그
      return false;
    }
  };

  console.log('mailcheck : ', mailcheck);

  const resetPassword = async (newPassword, confirmPassword) => {
    try {
      console.log(
        'resetPassword called with newPassword:',
        newPassword,
        'and confirmPassword:',
        confirmPassword
      ); // 디버깅용 로그
      // 비밀번호 재설정 로직 구현
      const response = await authService.resetPassword(
        newPassword,
        confirmPassword
      );
      return response;
    } catch (error) {
      console.error('Reset password error:', error); // 오류 로그
      return false;
    }
  };

  return (
    <ResetPassword
      onResetPassword={resetPassword}
      onMailCheck={mailcheck}
      onVerifyCodeCheck={verifycodecheck}
    />
  );
};

export default ResetPasswordPage;
