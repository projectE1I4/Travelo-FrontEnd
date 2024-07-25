import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const GoogleCallback = () => {
  const location = useLocation();
  const code = new URLSearchParams(location.search).get('code');
  const navigate = useNavigate();

  const [responseTag, setResponseTag] = useState('');

  console.log(code);

  const callBack = async () => {
    if (code) {
      try {
        const response = axiosInstance.get(`/travelo/googleCallback`, {
          params: { code },
        });

        console.log(response);
        // API 성공 후 처리
        console.log(response.data);
        // 2가지 가능성, error/username 이 들어오거나 accessToken/refreshToken이 들어오거나
        //const { error, accessToken, username } = response.data;

        if ('accessToken' in response.data) {
          const { accessToken } = response.data;
          sessionStorage.setItem('accessToken', accessToken);
          console.log('response:', response);
          console.log('response.data:', response.data);
          navigate('/home');
        } else if ('error' in response.data) {
          const { error, username } = response.data;
          console.log('response:', response);
          console.log('response.data:', response.data);
          navigate('/social/integrate', {
            state: { provider: 'google', username, error },
          });
        } else {
          console.error('예상치 못한 응답 데이터: ', response.data);
        }
      } catch (error) {
        console.error('API 호출 중 오류 발생: ', error);
        console.error('Error response: ', error.response);
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
