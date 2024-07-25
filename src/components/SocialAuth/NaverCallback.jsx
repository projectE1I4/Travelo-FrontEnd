import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';

const NaverCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const code = new URLSearchParams(location.search).get('code');
  const state = new URLSearchParams(location.search).get('stateString');

  useEffect(() => {
    const fetchAuthResponse = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/travelo/naverCallback',
          {
            params: {
              code,
              state,
            },
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
      }
    };

    if (code) {
      fetchAuthResponse();
    }
  }, [code, state, navigate]);

  return <div>로그인 중...</div>;
};

export default NaverCallback;
