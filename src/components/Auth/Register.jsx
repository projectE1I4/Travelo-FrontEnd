import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ onRegister, onMailCheck, onVerifyCodeCheck }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [tel, setTel] = useState('');
  const [mailCheckSuccess, setMailCheckSuccess] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');
  const navigate = useNavigate();

  const handleMailCheck = async (e) => {
    e.preventDefault();
    const result = await onMailCheck(username);
    setMailCheckSuccess(result.success);
  };

  const handleVerifyCodeCheck = async (e) => {
    e.preventDefault();
    const result = await onVerifyCodeCheck(username, verifyCode);
    setMailCheckSuccess(result.success);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mailCheckSuccess) {
      const success = await onRegister(username, password, rePassword, tel);
      if (success) {
        navigate('/login');
      }
    } else {
      console.log('인증 실패(Register)');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            type="email"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mt-1 block w-full"
          />
          {username && (
            <div>
              <button onClick={handleMailCheck}>이메일 인증</button>
              <input
                type="text"
                id="verifyCode"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value)}
                required
                className="mt-1 block w-full"
              />
              <button onClick={handleVerifyCodeCheck}>인증번호 확인</button>
            </div>
          )}
        </div>
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
            className="mt-1 block w-full"
          />
        </div>
        <div>
          <label htmlFor="rePassword" className="block font-medium">
            rePassword
          </label>
          <input
            type="password"
            id="rePassword"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            required
            className="mt-1 block w-full"
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
            className="mt-1 block w-full"
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
