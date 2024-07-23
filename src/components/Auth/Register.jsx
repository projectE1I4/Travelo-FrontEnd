import React, { useState } from 'react';
import styles from '../../styles/Auth.module.css';
import { useNavigate } from 'react-router-dom';
import useMailCheck from '../../hooks/useMailCheck';
import useVerifyCodeCheck from '../../hooks/useVerifyCodeCheck';
import useValidation from '../../hooks/useValidation';

const Register = ({ onRegister, onMailCheck, onVerifyCodeCheck }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [tel, setTel] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const navigate = useNavigate();

  const {
    usernameError,
    passwordError,
    passwordConfirmError,
    correctEmail,
    correctPassword,
    equalPassword,
  } = useValidation();

  const [mailCheckSuccess, handleMailCheck] = useMailCheck(onMailCheck);
  const [verifyCodeCheckSuccess, handleVerifyCodeCheck] =
    useVerifyCodeCheck(onVerifyCodeCheck);
  const [varifyCodeError, setVarifyCodeError] = useState('');

  const [mailChecked, setMailChecked] = useState(false);

  const handleChecked = () => {
    setMailChecked(true);
    return 'disable = true';
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setUsername(value);
    correctEmail(value);
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    correctPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (correctEmail(username) === false) {
      return;
    }

    if (correctPassword(password) === false) {
      return;
    }

    if (equalPassword(password, passwordCheck) === false) {
      return;
    }

    if (verifyCodeCheckSuccess) {
      const response = await onRegister(username, password, passwordCheck, tel);
      setVarifyCodeError('');
      if (response) {
        navigate('/users/login');
      } else {
        console.log('회원가입 실패');
      }
    } else {
      setVarifyCodeError('인증번호가 일치하지 않습니다.');
      console.log('인증 실패(Register)');
      console.log(mailCheckSuccess);
      console.log(verifyCodeCheckSuccess);
    }
  };

  const goToLogin = (e) => {
    e.preventDefault();
    navigate('/users/login');
  };

  return (
    <div className={styles['auth-content']}>
      <form onSubmit={handleSubmit} className={styles['form-content-register']}>
        <button
          onClick={(e) => {
            goToLogin(e);
          }}
          className={styles['btn-back-text']}
        >
          로그인 화면으로 돌아가기
        </button>
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
              이메일{' '}
            </label>
            {usernameError && (
              <span className={styles['error-message']}>{usernameError}</span>
            )}

            <input
              type="email"
              id="username"
              value={username}
              onChange={(e) => handleEmailChange(e)}
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
                {varifyCodeError && (
                  <span className={styles['error-message']}>
                    {varifyCodeError}
                  </span>
                )}
                <input
                  type="text"
                  id="verifyCode"
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value)}
                  required
                  className={styles['input-box']}
                  placeholder="인증 번호를 입력해 주세요."
                />
              </div>
            </div>
          )}
          <div className={styles['input-wrap-short']}>
            <label
              htmlFor="password"
              className={styles['input-label-required']}
            >
              비밀번호
            </label>
            {(passwordError && (
              <span className={styles['error-message']}>{passwordError}</span>
            )) ||
              (passwordConfirmError && (
                <span className={styles['error-message']}>
                  {passwordConfirmError}
                </span>
              ))}
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => handlePasswordChange(e)}
              required
              className={styles['input-box']}
              placeholder="비밀번호를 입력해 주세요."
            />
          </div>
          <div className={styles['input-wrap-short2']}>
            <label htmlFor="passwordCheck"></label>
            <input
              type="password"
              id="passwordCheck"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              required
              className={styles['input-box']}
              placeholder="비밀번호를 한번 더 입력해 주세요."
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
              placeholder="전화번호를 입력해주세요."
            />
          </div>
        </div>
        <div className={styles['btn-wrap']}>
          <button type="submit" className={styles['btn-point']}>
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
