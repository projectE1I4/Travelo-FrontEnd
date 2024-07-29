import { useState } from 'react';
import styles from '../../styles/components/user/LeaveUserModal.module.css';

const LeaveUserModal = ({ show, onClose, onConfirm }) => {
  if (!show) {
    return null;
  }
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(password, passwordCheck);
  };

  const handleOverlaClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles['leave-modalOverlay']} onClick={handleOverlaClick}>
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
            <p>
              탈퇴를 위해서는{' '}
              <span className={styles['leave-alert-warning']}>
                비밀번호 확인
              </span>
              이 필요합니다.
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type="password"
                id="password"
                onChange={(e) => handlePasswordChange(e)}
                required
                className={styles['leave-input-box']}
                placeholder="비밀번호를 입력해 주세요."
              />
              <input
                type="password"
                id="passwordCheck"
                onChange={(e) => setPasswordCheck(e.target.value)}
                required
                className={styles['leave-input-box']}
                placeholder="비밀번호를 한번 더 입력해 주세요."
              ></input>
              <div className={styles['leave-btn-wrap']}>
                <button type="submit" className={styles['leave-user-btn']}>
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveUserModal;
