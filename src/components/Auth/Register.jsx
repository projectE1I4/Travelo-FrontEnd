import React, { useState } from 'react';
import styles from '../../styles/Auth.module.css';
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

  const [mailChecked, setMailChecked] = useState(false);

  const handleChecked = () => {
    setMailChecked(true);
    return 'disable = true';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (verifyCodeCheckSuccess) {
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
    <div className={styles['auth-content']}>
      <form onSubmit={handleSubmit} className={styles['form-content-register']}>
        <div className={styles['logo-wrap']}>
          <p className={styles['brand-logo']}> travelo</p>
        </div>
        <div className={styles['input-area']}>
          <div
            className={[styles['input-wrap'], styles['input-btn-small']].join(
              ' '
            )}
          >
            <div className={styles['btn-wrap-small']}>
              <button
                onClick={(e) => {
                  handleMailCheck(username, e);
                  handleChecked;
                }}
                className={`${mailChecked ? styles['btn-checked'] : styles['btn-small']}`}
                disabled={'' || mailChecked}
              >
                이메일 인증
              </button>
            </div>
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
          {username && (
            <div className={styles['hidden-form']}>
              <div
                className={[
                  styles['input-wrap'],
                  styles['input-btn-small'],
                ].join(' ')}
              >
                <div className={styles['btn-wrap-small']}>
                  <button
                    onClick={(e) =>
                      handleVerifyCodeCheck(username, verifyCode, e)
                    }
                    className={styles['btn-small']}
                  >
                    인증번호 확인
                  </button>
                </div>
                <label
                  htmlFor="verifyCode"
                  className={styles['input-label-required']}
                >
                  인증 번호
                </label>
                <input
                  type="text"
                  id="verifyCode"
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value)}
                  required
                  className={styles['input-box']}
                />
              </div>
            </div>
          )}
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
            />
          </div>
          <div className={styles['input-wrap']}>
            <label
              htmlFor="passwordCheck"
              className={styles['input-label-required']}
            >
              비밀번호 확인
            </label>
            <input
              type="password"
              id="passwordCheck"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              required
              className={styles['input-box']}
            />
          </div>
          <div className={styles['input-wrap']}>
            <label htmlFor="tel" className={styles['input-label-required']}>
              전화번호
            </label>
            <input
              type="tel"
              id="tel"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              required
              className={styles['input-box']}
            />
          </div>
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
