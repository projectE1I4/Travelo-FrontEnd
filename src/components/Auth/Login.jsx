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

  const goToRegister = (e) => {
    e.preventDefault();
    navigate('/users/register');
  };

  return (
    <div className={styles['auth-content']}>
      <form onSubmit={handleSubmit} className={styles['form-content']}>
        <div className={styles['logo-wrap']}>
          <p className={styles['brand-logo']}> travelo</p>
        </div>
        <div className={styles['input-area']}>
          <div className={styles['input-wrap']}>
            <label
              htmlFor="username"
              className={styles['input-label-required']}
            >
              이메일
            </label>
            <input
              type="email"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={styles['input-box']}
              placeholder="이메일을 입력해 주세요."
            />
          </div>
          <div className={styles['input-wrap']}>
            <label
              htmlFor="password"
              className={styles['input-label-required']}
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles['input-box']}
              placeholder="비밀번호를 입력해주세요."
            />
          </div>
        </div>
        <div className={styles['btn-wrap']}>
          <button type="submit" className={styles['btn-point']}>
            로그인
          </button>
        </div>
        <div>
          <button
            type="button"
            className={styles['btn-line']}
            onClick={(e) => goToRegister(e)}
          >
            회원가입
          </button>
        </div>
        <div>
          <button type="button" className={styles['btn-text']}>
            비밀번호를 잊어버리셨나요?
          </button>
        </div>
        <div className={styles['line-wrap']}>소셜 로그인</div>
        <div className={styles['social-wrap']}>
          <KakaoLoginButton />
          <GoogleLoginButton />
          <NaverLoginButton />
        </div>
      </form>
    </div>
  );
};

export default Login;
