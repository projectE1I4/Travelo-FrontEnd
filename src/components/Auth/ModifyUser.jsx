import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import useMailCheck from '../../hooks/useMailCheck';
import styles from '../../styles/pages/ModifyUser.module.css';
import useValidation from '../../hooks/useValidation';
import { Button } from 'bootstrap';
import axiosInstance from '../../utils/axiosInstance';

const ModifyUser = ({ onMailCheck, onVerifyCodeCheck }) => {
  const { user } = useAuth();
  const [username, setUsername] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [tel, setTel] = useState('');

  useEffect(() => {
    if (user && user.username) {
      setUsername(user.username);
      setTel(user.tel);
    }
  }, [user]);

  const [mailCheckSuccess, handleMailCheck] = useMailCheck(onMailCheck);
  const [verifyCodeCheckSuccess, setVerifyCodeCheckSuccess] = useState(null);
  const [verifyCodeError, setVerifyCodeError] = useState('');

  const [mailChecked, setMailChecked] = useState(false);

  const [confirmMail, setConfirmMail] = useState(false);
  const [mailCheckBox, setMailCheckBox] = useState(true);

  const [changeButton, setChangeButton] = useState(false);

  const {
    usernameError,
    passwordError,
    passwordConfirmError,
    correctEmail,
    correctPassword,
    equalPassword,
  } = useValidation();

  const handleVerifyCodeCheck = async (username, verifyCode, e) => {
    e.preventDefault();
    const response = await onVerifyCodeCheck(username, verifyCode);
    setVerifyCodeCheckSuccess(response);
    if (!response) {
      setVerifyCodeError('인증번호가 일치하지 않습니다.');
    } else {
      setVerifyCodeError('');
      setChangeButton(true);
      setConfirmMail(false);
      setMailCheckBox(false);
    }
  };

  const handleEmailChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubtmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('passwordCheck', passwordCheck);
      formData.append('tel', tel);

      const response = await axiosInstance.post('/user/modify', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.status === 200) {
        window.location.href = '/mypage/modifyProfile';
      } else {
        console.log('문제 발생');
      }
      console.log('수정 시도');
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  return (
    <div className={styles['modify-content']}>
      <h2 className={styles['modify-title']}>회원 정보 수정</h2>
      <form className={styles['form-content-modify']}>
        <div className={styles['input-area']}>
          <div className={styles['input-wrap']}>
            <div className={styles['input-wrap-inline-email']}>
              <label
                htmlFor="username"
                className={styles['input-label-required']}
              >
                이메일
              </label>
            </div>

            <input
              type="email"
              id="username"
              value={username}
              onChange={(e) => handleEmailChange(e)}
              required
              className={[
                styles['input-box-readonly'],
                styles['input-box-inline'],
              ].join(' ')}
              placeholder="이메일을 입력해 주세요."
              readOnly
            />
          </div>
        </div>
        <div className={styles['password-wrap']}>
          <label htmlFor="password" className={styles['input-label-required']}>
            비밀번호
          </label>
          <div className={styles['input-wrap-short-password']}>
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
        {mailCheckBox === true && (
          <div className={styles['modify-Check-wrap']}>
            <div className={styles['modify-mailCheck']}>
              <p className={styles['modify-alert-message']}>
                * 회원 정보 수정을 위해서는 이메일 인증이 필요합니다.
              </p>
              <button
                onClick={(e) => {
                  handleMailCheck(username, e);
                  setConfirmMail(!mailChecked);
                }}
                className={styles['btn-point']}
              >
                이메일 인증
              </button>
            </div>
            {confirmMail === true && (
              <div>
                <div className={styles['input-wrap-vefiry']}>
                  <label
                    htmlFor="verifyCode"
                    className={styles['input-label-required']}
                  >
                    인증 번호
                  </label>
                  {verifyCodeError ? (
                    <span className={styles['error-message']}>
                      {verifyCodeError}
                    </span>
                  ) : (
                    <span></span>
                  )}

                  <input
                    type="text"
                    id="verifyCode"
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value)}
                    required
                    className={styles['input-box-verify']}
                    placeholder="인증 번호를 입력해 주세요."
                  />
                </div>
                <div className={styles['button-gap']}>
                  <button
                    onClick={(e) =>
                      handleVerifyCodeCheck(username, verifyCode, e)
                    }
                    className={styles['btn-point']}
                  >
                    인증번호 확인
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {changeButton === true && (
          <div>
            <button type="submit" className={styles['btn-point']}>
              수정하기
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ModifyUser;
