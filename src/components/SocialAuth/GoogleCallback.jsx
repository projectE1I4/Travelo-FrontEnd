import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const GoogleCallback = () => {
  const location = useLocation();
  const code = new URLSearchParams(location.search).get('code');

  useEffect(() => {
    if (code) {
      axios
        .get(`http://localhost:8080/travelo/googleCallback?code=${code}`)
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
  }, [code]);

  return <div>로그인 중...</div>;
};

export default GoogleCallback;
