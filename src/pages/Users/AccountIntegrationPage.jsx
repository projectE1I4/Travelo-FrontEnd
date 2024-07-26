import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/pages/social/Social.module.css';

const AccountIntergrationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [presentAccount, setPresentAccount] = useState('');
  const [currentAccount, setCurrentAccount] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (location.state && location.state.provider && location.state.username) {
      setPresentAccount(location.state.provider);
      setUsername(location.state.username);
      setCurrentAccount(location.state.currentTry);
    } else {
      navigate('/');
    }
  }, [location, navigate]);

  const handleIntegration = async (provider) => {
    if (provider === 'kakao') {
      try {
        const kakaoKey = import.meta.env.VITE_API_KAKAO_KEY;
        window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoKey}&redirect_uri=http://localhost:5173/travelo/integratedKakao`;
      } catch (error) {}
    } else if (provider === 'google') {
      console.log('구글 버튼 눌림');
      try {
        const formData = new FormData();
        formData.append('username', username);

        console.log(username);

        console.log('트라이');
        const response = await axios.post(
          'http://localhost:8080/travelo/integratedGoogle',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        console.log('response: ', response);
        if (response.status === 200) {
          const { accessToken, refreshToken } = response.data;
          sessionStorage.setItem('accessToken', accessToken);
          sessionStorage.setItem('refreshToken', refreshToken);
          navigate('/social/integratedComplete'); // 통합 완료 후 이동
        } else {
          console.error('Unexpected response status: ', response.status);
        }
      } catch (error) {
        console.log('Google 통합 중 오류 발생', error);
        if (error.response) {
          console.error('응답 데이터: ', error.response.data);
          console.error('응답 상태: ', error.response.status);
        } else {
          console.error('Error: ', error.message);
        }
      }
    } else if (provider === 'naver') {
      try {
        const formData = new FormData();
        formData.append('username', username);

        const response = await axios.post(
          'http://localhost:8080/travelo/integratedNaver',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        if (response.status === 200) {
          const { accessToken, refreshToken } = response.data;
          sessionStorage.setItem('accessToken', accessToken);
          sessionStorage.setItem('refreshToken', refreshToken);
          navigate('/social/integratedComplete'); // 통합 완료 후 이동
        }
      } catch (error) {
        console.log('네이버 통합 중 오류 발생', error);
      }
    }
  };

  const transProvider = (provider) => {
    if (provider === 'kakao') return '카카오';
    if (provider === 'google') return '구글';
    if (provider === 'naver') return '네이버';
    return '문제가 발생했습니다.';
  };

  return (
    <div className="grid-container">
      <div className={styles['integrate-content']}>
        <div className={styles['integrate-inside-content']}>
          <div className={styles['logo-wrap']}>
            <p className={styles['brand-logo']}> travelo</p>
          </div>
          <p className={styles['integrate-title']}>
            <span className={styles['integrate-username']}>{username}</span> 는{' '}
            이미 사용되고 있습니다!
          </p>
          {presentAccount && currentAccount && (
            <div>
              <div className={styles['integrate-suggestion-box']}>
                <p className={styles['intergate-suggetion-text-gap']}>
                  <span className={styles['integrate-social']}>
                    {transProvider(currentAccount)}
                  </span>
                  로 가입 요청을 주셨지만,{' '}
                  <span className={styles['integrate-social']}>
                    {transProvider(presentAccount)}
                  </span>
                  에서 같은 이메일로 사용한 기록이 있습니다.
                </p>

                <p>
                  원활한 사용을 위해{' '}
                  <span className={styles['integrate-username']}>
                    계정 통합
                  </span>{' '}
                  후 이용해주세요!
                </p>
              </div>
              <div className={styles['integrate-button-wrap']}>
                <button
                  onClick={() => handleIntegration(presentAccount)}
                  className={styles[`integrate-button-${presentAccount}`]}
                >
                  {transProvider(presentAccount)}로 통합
                </button>
                <button
                  onClick={() => handleIntegration(currentAccount)}
                  className={styles[`integrate-button-${currentAccount}`]}
                >
                  {transProvider(currentAccount)}로 통합
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountIntergrationPage;
