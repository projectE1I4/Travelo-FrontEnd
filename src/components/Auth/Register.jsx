import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMailCheck from '../../hooks/useMailCheck';
import useVerifyCodeCheck from '../../hooks/useVerifyCodeCheck';

const Register = ({ onRegister, onMailCheck, onVerifyCodeCheck }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [tel, setTel] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const navigate = useNavigate();

  const [mailCheckSuccess, handleMailCheck] = useMailCheck(onMailCheck);
  const [verifyCodeCheckSuccess, handleVerifyCodeCheck] =
    useVerifyCodeCheck(onVerifyCodeCheck);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Mail Check Success:', mailCheckSuccess); // 디버깅용 로그
    console.log('Verify Code Check Success:', verifyCodeCheckSuccess); // 디버깅용 로그

    if (mailCheckSuccess && verifyCodeCheckSuccess) {
      const response = await onRegister(username, password, passwordCheck, tel);
      if (response) {
        navigate('/users/login');
      } else {
        console.log('회원가입 실패');
      }
    } else {
      console.log('인증 실패(Register)');
      console.log(mailCheckSuccess);
      console.log(verifyCodeCheckSuccess);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block font-medium">
            Email
          </label>
          <input
            type="email"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mt-1 block w-full border rounded-lg  border-txt400 h-10"
          />
          <button onClick={(e) => handleMailCheck(username, e)}>
            이메일 인증
          </button>
        </div>
        {username && (
          <div>
            <label htmlFor="verifyCode" className="block font-medium">
              Verify Code
            </label>
            <input
              type="text"
              id="verifyCode"
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value)}
              required
              className="mt-1 block w-full border rounded-lg  border-txt400 h-10"
            />
            <button
              onClick={(e) => handleVerifyCodeCheck(username, verifyCode, e)}
            >
              인증번호 확인
            </button>
          </div>
        )}
        <div>
          <label htmlFor="password" className="block font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full border rounded-lg  border-txt400 h-10"
          />
        </div>
        <div>
          <label htmlFor="passwordCheck" className="block font-medium">
            passwordCheck
          </label>
          <input
            type="password"
            id="passwordCheck"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            required
            className="mt-1 block w-full border rounded-lg  border-txt400 h-10"
          />
        </div>
        <div>
          <label htmlFor="tel" className="block font-medium">
            tel
          </label>
          <input
            type="tel"
            id="tel"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            required
            className="mt-1 block w-full border rounded-lg  border-txt400 h-10"
          />
        </div>
        <div>
          <button type="submit" className="btn btn_type_1">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
