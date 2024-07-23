import React, { useEffect, useState } from 'react';
import styles from '../../styles/Auth.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import useMailCheck from '../../hooks/useMailCheck';
import useVerifyCodeCheck from '../../hooks/useVerifyCodeCheck';
import useValidation from '../../hooks/useValidation';

const ResetPassword = ({ onResetPassword, onMailCheck, onVerifyCodeCheck }) => {
  const location = useLocation();
  const [verifyCode, setVerifyCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { username } = location.state || {};

  const {
    passwordError,
    passwordConfirmError,
    correctPassword,
    equalPassword,
  } = useValidation();

  const navigate = useNavigate();

  // 메일 체크해서 성공인지
  const [mailCheckSuccess, handleMailCheck] = useMailCheck(onMailCheck);

  console.log('mailCheckSuccess', mailCheckSuccess);

  // 인증번호 체크 결과
  const [verifyCodeCheckSuccess, handleVerifyCodeCheck] =
    useVerifyCodeCheck(onVerifyCodeCheck);
  // 인증번호 에러 메시지

  const [varifyCodeError, setVarifyCodeError] = useState('');

  useEffect(() => {
    console.log('mailCheckSuccess: ', mailCheckSuccess);
    console.log('verifyCodeCheckSuccess: ', verifyCodeCheckSuccess);
  }, [mailCheckSuccess, verifyCodeCheckSuccess]);

  // 비밀번호 재설정 submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 유저 이름을 저장
    sessionStorage.setItem('username', username);
    try {
      // 유효성 검사에 알맞는 비밀번호인지 맞지 않으면 리턴
      if (correctPassword(newPassword) === false) {
        return;
      }

      // 비밀번호와 비밀번호 확인이 같은지 맞지 않으면 리턴
      if (equalPassword(newPassword, confirmPassword) === false) {
        return;
      }

      // 인증번호가 맞았다면,
      if (verifyCodeCheckSuccess) {
        // 에러코드 없음
        setVarifyCodeError('');

        // 리셋 비밀번호 api 진행
        const response = await onResetPassword(
          newPassword,
          confirmPassword,
          username
        );

        // api 결과가 제대로 들어온 경우
        if (response) {
          console.log('비밀번호 재설정 성공');
          // 로그인으로 이동
          navigate('/users/login');
          // api 결과가 제대로 들어오지 않은 경우
        } else {
          // 제대로 들어오지 않은 경우
          console.log('비밀번호 재설정 실패');
        }
      } else {
        // 인증번호가 틀린 경우
        setVarifyCodeError('인증번호가 일치하지 않습니다.');
        console.log('인증 실패(ResetPassword)');
      }
      // 불러오는 도중 문제가 발생한 경우
    } catch (error) {
      console.error('문제 발생:', error);
    }
  };

  return (
    <div className={styles['auth-content']}>
      <form onSubmit={handleSubmit} className={styles['form-content']}>
        <div className={styles['logo-wrap']}>
          <p className={styles['brand-logo']}> travelo</p>
        </div>
        <div className={styles['input-area']}>
          <div
            className={[
              styles['input-wrap-short2'],
              styles['input-btn-small'],
            ].join(' ')}
          >
            <div className={styles['btn-wrap-small']}>
              <button
                onClick={(e) => handleMailCheck(username, e)}
                className={styles['btn-small']}
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
              value={username || ''}
              required
              readOnly
              className={styles['input-box-readonly']}
            />
          </div>
        </div>

        <div className={styles['input-wrap-short2']}>
          <input
            type="text"
            placeholder="인증 코드"
            value={verifyCode}
            onChange={(e) => setVerifyCode(e.target.value)}
            className={styles['input-box']}
          />
        </div>
        <div className={styles['error-message-wrap']}>
          {/* varifyCodeError 메시지를 띄움 */}
          <p className={styles['error-message']}>{varifyCodeError}</p>
        </div>
        <div className={styles['btn-wrap']}>
          <button
            type="button"
            onClick={async (e) => {
              const success = await handleVerifyCodeCheck(
                username,
                verifyCode,
                e
              );
              if (!success) {
                setVarifyCodeError('인증번호가 일치하지 않습니다.');
              }
            }}
            className={styles['btn-line']}
          >
            인증번호 확인
          </button>
        </div>
        {verifyCodeCheckSuccess && (
          <div className={styles['hidden-form-reset']}>
            <div className={styles['input-wrap']}>
              <label
                htmlFor="password"
                className={styles['input-label-required']}
              >
                비밀번호
              </label>
              <span className={styles['error-message']}>{passwordError}</span>
              <input
                type="password"
                placeholder="변경 하려는 비밀번호를 입력해 주세요."
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={styles['input-box']}
              />
            </div>
            <div className={styles['input-wrap-short2']}>
              <input
                type="password"
                placeholder="비밀번호 한번 더 입력해주세요."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles['input-box']}
              />
            </div>
            <div className={styles['error-message-wrap']}>
              <p className={styles['error-message']}>{passwordConfirmError}</p>
            </div>

            <div className={styles['btn-wrap']}>
              <button onClick={handleSubmit} className={styles['btn-point']}>
                비밀번호 재설정
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
