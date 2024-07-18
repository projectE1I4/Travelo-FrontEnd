import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const ResetPassword = () => {
  const [username, setUsername] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    try {
      const mailConfirmResponse = await axiosInstance.post(
        '/travelo/mailConfirm',
        {
          username: username,
        }
      );

      console.log('메일 확인 응답 : ', mailConfirmResponse.data);
      const verifyCodeReponse = await axiosInstance.post(
        '/travelo/verifyCode',
        {
          username: username,
          verifyCode: verifyCode,
        }
      );

      console.log('인증 코드 검증 응답: ', verifyCodeReponse.data);

      if (verifyCodeReponse.data === true) {
        const resetPasswordResponse = await axiosInstance.post(
          '/travelo/resetPassword',
          {
            password: newPassword,
            passwordCheck: confirmPassword,
          }
        );

        console.log('비밀번호 재설정 응답: ', resetPasswordResponse.data);
        setMessage(resetPasswordResponse.data);
      } else {
        setMessage('인증 코드가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('API 요청 중 에러 발생: ', error);
      setMessage('API 요청 중 에러 발생');
    }
  };

  return (
    <div>
      <h2>비밀번호 재설정</h2>
      <input
        type="text"
        placeholder="이메일"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="인증 코드"
        value={verifyCode}
        onChange={(e) => setVerifyCode(e.target.value)}
      />
      <input
        type="password"
        placeholder="새 비밀번호"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleResetPassword}>비밀번호 재설정</button>
      <p>{message}</p>
    </div>
  );
};

export default ResetPassword;
