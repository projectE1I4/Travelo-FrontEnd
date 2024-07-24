import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const GoogleCallback = () => {
  const location = useLocation();
  const code = new URLSearchParams(location.search).get('code');
  const navigate = useNavigate();

  console.log(code);

  useEffect(() => {
    if (code) {
      axiosInstance
        .get(`/travelo/googleCallback`, {
          params: { code },
        })
        .then((response) => {
          // 로그인 성공 후 처리
          console.log(response.data);
          const { error, accessToken, username } = response.data;

          if (error) {
            navigate('/social/integrate', {
              state: { provider: 'google', username, error },
            });
          } else {
            sessionStorage.setItem('accessToken', accessToken);
            navigate('/home');
          }
        })
        .catch((error) => {
          console.error('로그인 실패:', error);
        });
    }
  }, [code, navigate]);

  return <div>로그인 중...</div>;
};

export default GoogleCallback;
