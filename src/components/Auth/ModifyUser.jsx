import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import styles from '../../styles/pages/ModifyUser.module.css';
import useValidation from '../../hooks/useValidation';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import LeaveUserModal from './LeaveUserModal';

const ModifyUser = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [tel, setTel] = useState('');

  useEffect(() => {
    if (user && user.username) {
      setUsername(user.username);
      setTel(user.tel);
      setTel(user.tel || '');
    }
  }, [user]);

  const {
    usernameError,
    passwordError,
    passwordConfirmError,
    correctEmail,
    correctPassword,
    equalPassword,
  } = useValidation();

  const handleEmailChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const passwordEqual = correctPassword(password, passwordCheck);
      if (passwordEqual) {
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
      }

      console.log('수정 시도');
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleDeleteAccount = async (password, passwordCheck) => {
    try {
      const formData = new URLSearchParams();
      formData.append('password', password);
      formData.append('passwordCheck', passwordCheck);
      const response = await axiosInstance.post('/user/resign', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      console.log('탈퇴 실행?');
      if (response.status === 200) {
        console.log('회원 탈퇴');
        setShowModal(false);
        navigate('/home');
      }
    } catch (error) {
      console.error('error 생김, 탈퇴 불가', error);
    }
  };

  return (
    <div className={styles['modify-content']}>
      <h2 className={styles['modify-title']}>회원 정보 수정</h2>
      <div className={styles['form-content-modify']}>
        <form className={styles['input-area']}>
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
              readOnly
            />
          </div>
          <div className={styles['password-wrap']}>
            <label
              htmlFor="password"
              className={styles['input-label-required']}
            >
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

          <div>
            <button
              type="submit"
              className={styles['btn-point']}
              onClick={(e) => handleSubmit(e)}
            >
              수정하기
            </button>
          </div>
        </form>
        <div>
          <button
            type="button"
            className={styles['modify-btn-text']}
            onClick={() => {
              setShowModal(true);
            }}
          >
            회원 탈퇴하기
          </button>
          <LeaveUserModal
            show={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={handleDeleteAccount}
          />
        </div>
      </div>
    </div>
  );
};

export default ModifyUser;
