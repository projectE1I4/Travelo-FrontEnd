import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMailCheck from '../../hooks/useMailCheck';
import useVerifyCodeCheck from '../../hooks/useVerifyCodeCheck';
import authService from '../../services/authService';

const ResetPassword = ({ onResetPassword, onMailCheck, onVerifyCodeCheck }) => {
  const [username, setUsername] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const [mailCheckSuccess, handleMailCheck] = useMailCheck(onMailCheck);
  const [verifyCodeCheckSuccess, handleVerifyCodeCheck] =
    useVerifyCodeCheck(onVerifyCodeCheck);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Mail Check Success:', mailCheckSuccess); // 디버깅용 로그
      console.log('Verify Code Check Success:', verifyCodeCheckSuccess); // 디버깅용 로그

      if (mailCheckSuccess && verifyCodeCheckSuccess) {
        const response = await onResetPassword(newPassword, confirmPassword);
        if (response) {
          console.log('비밀번호 재설정 성공');
          navigate('/users/login');
        } else {
          console.log('비밀번호 재설정 실패');
          setMessage('비밀번호 재설정 실패');
        }
      } else {
        console.log('인증 실패(ResetPassword)');
        setMessage('인증 실패');
      }
    } catch (error) {
      console.error('문제 발생:', error);
      setMessage('문제 발생');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2>비밀번호 재설정</h2>
        <input
          type="text"
          placeholder="이메일"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="button" onClick={(e) => handleMailCheck(e, username)}>
          이메일 인증
        </button>

        <div>
          <input
            type="text"
            placeholder="인증 코드"
            value={verifyCode}
            onChange={(e) => setVerifyCode(e.target.value)}
          />
          <button
            type="button"
            onClick={(e) => handleVerifyCodeCheck(username, verifyCode, e)}
          >
            인증번호 확인
          </button>
        </div>
        {mailCheckSuccess && verifyCodeCheckSuccess && (
          <div>
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
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
