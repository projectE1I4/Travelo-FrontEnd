import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import styles from '../../styles/pages/ModifyUser.module.css';
import useValidation from '../../hooks/useValidation';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import LeaveUserModal from './LeaveUserModal';

const ModifyUserGoogle = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (user && user.username) {
      setUsername(user.username);
    }
  }, [user]);

  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      //탈퇴 연결하기
      console.log('탈퇴 실행?');
    } catch (error) {
      console.error('error 생김, 탈퇴 불가', error);
    }
  };

  return (
    <div className={styles['modify-content']}>
      <h2 className={styles['modify-title']}>회원 정보 수정</h2>
      <div className={styles['form-content-modify']}>
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
              required
              className={[
                styles['input-box-readonly'],
                styles['input-box-inline'],
              ].join(' ')}
              readOnly
            />
          </div>
          <div>
            <p>연동 소셜: {user && user.oauthType}</p>
          </div>
        </div>
        <div>
          <button
            type="button"
            className={styles['modify-btn-text']}
            onClick={() => {
              handleDeleteAccount;
            }}
          >
            회원 탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModifyUserGoogle;
