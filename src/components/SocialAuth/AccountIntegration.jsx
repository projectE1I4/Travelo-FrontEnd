import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import KakaoLoginButton from '../../components/SocialAuth/KakaoLoginButton';
import GoogleLoginButton from '../../components/SocialAuth/GoogleLoginButton';
import NaverLoginButton from '../../components/SocialAuth/NaverLoginButton';
import axiosInstance from '../../utils/axiosInstance';
import axios from 'axios';

const AccountIntergration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const code = new URLSearchParams(location.search).get('code');

  console.log('일단 카카오');

  const [presentAccount, setPresentAccount] = useState('');
  const [currentAccount, setCurrentAccount] = useState('');
  const [username, setUsername] = useState('');

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
    <div>
      <h1>계정 통합</h1>
      <p>통합 완료</p>
    </div>
  );
};

export default AccountIntergration;
