import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';

const NaverCallback = () => {
  const location = useLocation();
  const code = new URLSearchParams(location.search).get('code');
  const state = new URLSearchParams(location.search).get('stateString');

  useEffect(() => {
    if (code && state) {
      axiosInstance
        .get(`/travelo/naverCallback`, {
          params: {
            code,
            state,
          },
        })
        .then((response) => {
          // 로그인 성공 후 처리
          console.log(response.data);
          const { accessToken } = response.data;
          sessionStorage.setItem('accessToken', accessToken);
        })
        .catch((error) => {
          console.error('로그인 실패:', error);
        });
    }
  }, [, state]);

  return <div>로그인 중...</div>;
};

export default NaverCallback;
