import { useState } from 'react';
import useValidation from '../../hooks/useValidation';
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
        <button type="button" onClick={onClose}>
          ×
        </button>
        <h2>탈퇴하시겠습니까?</h2>
        <div>
          <p>탈퇴하시려면 비밀번호 확인이 필요합니다.</p>
          <p>그동안 서비스를 이용해주셔서 감사합니다!</p>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              id="password"
              onChange={(e) => handlePasswordChange(e)}
              required
              className={styles['input-box-password']}
              placeholder="비밀번호를 입력해 주세요."
            />
            <input
              type="password"
              id="passwordCheck"
              onChange={(e) => setPasswordCheck(e.target.value)}
              required
              className={styles['input-box']}
              placeholder="비밀번호를 한번 더 입력해 주세요."
            ></input>
            <button type="submit">탈퇴하기</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeaveUserModal;
