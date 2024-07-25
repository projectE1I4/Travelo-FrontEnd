import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import KakaoLoginButton from '../../components/SocialAuth/KakaoLoginButton';
import GoogleLoginButton from '../../components/SocialAuth/GoogleLoginButton';
import NaverLoginButton from '../../components/SocialAuth/NaverLoginButton';
import axiosInstance from '../../utils/axiosInstance';

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

  const handleIntergration = async (provider) => {
    if (provider === 'kakao') {
      try {
        const kakaoKey = import.meta.env.VITE_API_KAKAO_KEY;
        window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoKey}&redirect_uri=http://localhost:5173/travelo/integratedKakao`;
      } catch (error) {}
    } else if (provider === 'google') {
      try {
        const formData = new FormData();
        formData.append('username', username);

        const response = await axiosInstance.post(
          '/travelo/integratedGoogle',
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
          navigate('/integration-complete'); // 통합 완료 후 이동
        }
      } catch (error) {
        console.log('Google 통합 중 오류 발생', error);
      }
    } else if (provider === 'naver') {
      try {
        const formData = new FormData();
        formData.append('username', username);

        const response = await axiosInstance.post(
          '/travelo/integratedNaver',
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
          navigate('/social/complete'); // 통합 완료 후 이동
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
    <div>
      <h1>계정 통합</h1>
      <p>{username} 이메일을 사용하는 계정이 이미 존재합니다.</p>
      {presentAccount && currentAccount && (
        <div>
          <p>
            {presentAccount} 계정과 {currentAccount} 계정을 통합하시겠습니까?
          </p>
          <button onClick={() => handleIntergration(presentAccount)}>
            {transProvider(presentAccount)}로 통합
          </button>
          <button onClick={() => handleIntergration(currentAccount)}>
            {transProvider(currentAccount)}로 통합
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountIntergrationPage;
