import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../../styles/pages/social/Social.module.css';

const AccountIntergration = () => {
  const location = useLocation();

  const goToHome = (e) => {
    e.preventDefault;
    window.location.href = '/';
  };

  return (
    <div className="grid-container">
      <div className={styles['integrate-content']}>
        <div className={styles['integrate-inside-content']}>
          <div className={styles['logo-wrap']}>
            <p className={styles['brand-logo']}> travelo</p>
          </div>
          <div className={styles['integrate-suggestion-box-complete']}>
            <p>계정 통합이 완료되었습니다!</p>
          </div>
          <div className={styles['integrate-button-wrap-complete']}>
            <button
              onClick={(e) => goToHome(e)}
              className={styles['integrate-button-home']}
            >
              메인으로 가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountIntergration;
