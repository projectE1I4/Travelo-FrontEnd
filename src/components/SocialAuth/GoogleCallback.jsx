import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import axios from 'axios';

const GoogleCallback = () => {
  const location = useLocation();
  const code = new URLSearchParams(location.search).get('code');
  const navigate = useNavigate();

  const [responseTag, setResponseTag] = useState('');

  console.log(code);

  const callBack = async () => {
    if (code) {
      try {
        const response = await axios.get(
          'http://localhost:8080/travelo/googleCallback',
          {
            params: { code },
          }
        );
        console.log(response);
        // API 성공 후 처리
        console.log(response.data);
        // 2가지 가능성, error/username 이 들어오거나 accessToken/refreshToken이 들어오거나
        //const { error, accessToken, username } = response.data;

        if (response.status === 200) {
          const { accessToken, refreshToken } = response.data;
          sessionStorage.setItem('accessToken', accessToken);
          sessionStorage.setItem('refreshToken', refreshToken);
          navigate('/home');
        } else if (response.status === 400) {
          const { error, username } = response.data;
          navigate('/social/integrate', {
            state: { provider: 'google', username, error },
          });
        } else {
          console.error('예상치 못한 응답 데이터: ', response.data);
        }
      } catch (error) {
        console.error('API 호출 중 오류 발생: ', error);
        console.error('Error response: ', error.response);
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
          let currentTry = 'google';
          navigate('/social/integrate', {
            state: { provider, currentTry, username, error: errorMessage },
          });
        }
      }

      // if (error) {
      //   navigate('/social/integrate', {
      //     state: { provider: 'google', username, error },
      //   });
      // } else {
      //   sessionStorage.setItem('accessToken', accessToken);
      //   navigate('/home');
      // }
    }
  };

  useEffect(() => {
    callBack();
  }, [code]);

  return <div>로그인 중...</div>;
};

export default GoogleCallback;
