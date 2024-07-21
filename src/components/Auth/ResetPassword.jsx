import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMailCheck from '../../hooks/useMailCheck';
import useVerifyCodeCheck from '../../hooks/useVerifyCodeCheck';

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

  useEffect(() => {
    console.log('mailCheckSuccess: ', mailCheckSuccess);
    console.log('verifyCodeCheckSuccess: ', verifyCodeCheckSuccess);
  }, [mailCheckSuccess, verifyCodeCheckSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    sessionStorage.setItem('username', username);
    try {
      if (verifyCodeCheckSuccess) {
        const response = await onResetPassword(
          newPassword,
          confirmPassword,
          username
        );
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
        <div>
          <label htmlFor="username" className="block font-medium">
            Email
          </label>
          <input
            type="email"
            id="username"
            placeholder="이메일"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button onClick={(e) => handleMailCheck(username, e)}>
            이메일 인증
          </button>
        </div>

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
        {verifyCodeCheckSuccess && (
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
            <button onClick={handleSubmit}>비밀번호 재설정</button>
            <p>{message}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
