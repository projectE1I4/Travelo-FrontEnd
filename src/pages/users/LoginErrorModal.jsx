import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from '../../styles/components/user/LeaveUserModal.module.css';

const LoginErrorModal = ({ show, onClose, username }) => {
  if (!show) {
    return null;
  }

  const navigate = useNavigate();
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const goToCheckUser = (e) => {
    e.preventDefault();
    navigate('/users/checkUser');
  };

  return (
    <div className={styles['leave-modalOverlay']} onClick={handleOverlayClick}>
      <div className={styles['leave-modalContent']}>
        <div className={styles['leave-question-box']}>
          <h3 className={styles['leave-title']}>
            이전에 가입하셨던 적이 있으신가요?
          </h3>
          <div className={styles['leave-alert-box']}>
            <p>
              이미{' '}
              <span className={styles['leave-alert-point']}>
                동일 이메일로 가입된 기록
              </span>
              이 있습니다!
            </p>
            <p className={['message-container']}>
              기존에 이메일 계정{' '}
              <span className={styles['leave-alert-point']}>{username}</span>{' '}
              으로 로그인 해주세요!
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={styles['leave-btn']}
          >
            확인했어요!
          </button>
          <button
            className={styles['leave-btn-text']}
            onClick={(e) => goToCheckUser(e)}
          >
            비밀번호를 잊어버리셨나요?
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginErrorModal;
