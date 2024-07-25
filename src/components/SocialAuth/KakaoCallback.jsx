import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import axios from 'axios';

const KakaoCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const code = new URLSearchParams(location.search).get('code');

  console.log('카카오');

  useEffect(() => {
    const fetchAuthResponse = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/travelo/kakaoCallback',
          {
            params: { code },
          }
        );

        if (response.status === 200) {
          const { accessToken, refreshToken } = response.data;
          sessionStorage.setItem('accessToken', accessToken);
          sessionStorage.setItem('refreshToken', refreshToken);
          navigate('/home');
        } else if (response.status === 400) {
          const { error, username } = response.data;
          navigate('/social/integrate', {
            state: { provider: 'kakao', username, error },
          });
        }
      } catch (error) {
        console.error('Error fetching auth response:', error);
        if (error.response && error.response.status === 400) {
          const { error: errorMessage, username } = error.response.data;
          let provider = 'unknown';
          if (errorMessage.includes('kakao')) {
            provider = 'kakao';
          } else if (errorMessage.includes('google')) {
            provider = 'google';
          } else if (errorMessage.includes('naver')) {
            provider = 'naver';
          }
          let currentTry = 'kakao';
          console.log(
            '통합 페이지로 이동, error:',
            errorMessage,
            'username:',
            username
          );
          navigate('/social/integrate', {
            state: { provider, currentTry, username, error: errorMessage },
          });
        }
      }
    };

    if (code) {
      fetchAuthResponse();
    }
  }, [code, navigate]);

  return <div>로그인 중...</div>;
};

export default KakaoCallback;
