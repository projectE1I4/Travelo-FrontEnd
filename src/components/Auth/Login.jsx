import React, { useState } from 'react';
import styles from '../../styles/Auth.module.css';
import { useNavigate } from 'react-router-dom';
import KakaoLoginButton from '../SocialAuth/KakaoLoginButton';
import GoogleLoginButton from '../SocialAuth/GoogleLoginButton';
import NaverLoginButton from '../SocialAuth/NaverLoginButton';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await onLogin(username, password);
    console.log(success);
    if (success) {
      navigate('/home');
    }
  };

  return (
    <div className={styles['auth-content']}>
      <form onSubmit={handleSubmit} className={styles['form-content']}>
        <div className={styles['logo-wrap']}>
          <p className={styles['brand-logo']}> travelo</p>
        </div>
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
            className="mt-1 block w-full border rounded-lg border-txt400 h-10"
            placeholder="이메일"
          />
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
            className="mt-1 block w-full border rounded-lg  border-txt400 h-10"
            placeholder="비밀번호"
          />
        </div>
        <div>
          <button type="submit" className="btn btn_type_1">
            Login
          </button>
        </div>
        <div>
          <KakaoLoginButton />
          <GoogleLoginButton />
          <NaverLoginButton />
        </div>
        <div>
          <button type="button" className="btn btn_type_2">
            회원가입
          </button>
        </div>
        <div>
          <button type="button" className="btn">
            비밀번호 재설정
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
