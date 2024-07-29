import { useAuth } from '../../hooks/useAuth';
import styles from '../../styles/components/user/LeaveUserModal.module.css';
const LeaveSocialUserModal = ({ show, onClose, onConfirm }) => {
  if (!show) {
    return null;
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    onConfirm();
  };

  const { user } = useAuth();

  return (
    <div className={styles['leave-modalOverlay']} onClick={handleOverlayClick}>
      <div className={styles['leave-modalContent']}>
        <div className={styles['leave-question-box']}>
          <h2 className={styles['leave-title']}>탈퇴하시겠습니까?</h2>
          <div className={styles['leave-alert-box']}>
            <p>
              탈퇴 시{' '}
              <span className={styles['leave-alert-warning']}>동일 이메일</span>
              로 <span className={styles['leave-alert-warning']}>재가입</span>이{' '}
              <span className={styles['leave-alert-warning']}>불가</span>
              합니다.
            </p>
          </div>
          <div className={styles['leave-btn-wrap']}>
            <button
              type="button"
              onClick={handleConfirm}
              className={styles['leave-user-btn']}
            >
              탈퇴하기
            </button>
            <button
              type="button"
              onClick={onClose}
              className={styles['leave-btn']}
            >
              취소하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveSocialUserModal;
