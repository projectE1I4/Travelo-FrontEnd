import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../../styles/pages/social/Social.module.css';

import axios from 'axios';

const AccountIntergrationKakao = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const code = new URLSearchParams(location.search).get('code');

  console.log('일단 카카오');

  const goToHome = (e) => {
    e.preventDefault;
    window.location.href = '/';
  };

  useEffect(() => {
    const fetchAuthResponse = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/travelo/integratedKakao',
          {
            params: { code },
          }
        );
        if (response.status === 200) {
          const { accessToken, refreshToken } = response.data;
          sessionStorage.setItem('accessToken', accessToken);
          sessionStorage.setItem('refreshToken', refreshToken);
          navigate('/social/complete');
        }
      } catch (error) {
        console.error('Error fetching auth response:', error);
      }
    };

    if (code) {
      fetchAuthResponse();
    }
  }, [code, navigate]);

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

export default AccountIntergrationKakao;
