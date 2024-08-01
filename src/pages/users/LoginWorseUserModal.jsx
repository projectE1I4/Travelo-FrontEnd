import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from '../../styles/components/user/LeaveUserModal.module.css';
import { useState } from 'react';

const LoginWorseUserModal = ({ onShow, onClose, username }) => {
  if (!onShow) {
    return null;
  }

  const [onQuestion, setOnQuestion] = useState(false);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const doOnQuestion = (e) => {
    e.preventDefault();
    setOnQuestion(true);
  };

  return (
    <div className={styles['leave-modalOverlay']} onClick={handleOverlayClick}>
      <div className={styles['leave-modalContent']}>
        <div className={styles['leave-question-box']}>
          <div className={styles['warning-user-box']}>
            <p>{username}</p>
          </div>

          <div className={styles['leave-alert-box']}>
            {onQuestion ? (
              <p>
                관련된 문의 사항은
                <br />
                <span className={styles['leave-alert-point']}>
                  springb88t@gmail.com
                </span>
                으로 부탁드립니다.
              </p>
            ) : (
              <p>
                위 계정은 지속된{' '}
                <span className={styles['leave-alert-warning']}>악성 후기</span>
                로 관리자 측에서{' '}
                <span className={styles['leave-alert-warning']}>
                  <br /> 탈퇴 처리
                </span>{' '}
                되었습니다.
              </p>
            )}
          </div>
          {onQuestion ? (
            <button
              type="button"
              onClick={onClose}
              className={styles['leave-btn']}
            >
              닫기
            </button>
          ) : (
            <div className={styles['leave-btn-wrap']}>
              <button
                type="button"
                onClick={doOnQuestion}
                className={styles['leave-btn']}
              >
                문의하기
              </button>
              <button
                type="button"
                onClick={onClose}
                className={styles['leave-btn']}
              >
                닫기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginWorseUserModal;
