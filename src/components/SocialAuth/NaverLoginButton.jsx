import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const NaverLoginButton = () => {
  const naverClientId = import.meta.env.VITE_API_NAVER_CLIENT_ID;
  const [username, setUsername] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [provider, setProvider] = useState(false);

  const handleLogin = () => {
    const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&state=STATE_STRING&redirect_uri=http://localhost:8080/travelo/naverCallback`;
    console.log('naverLoginUrl', naverLoginUrl);
    window.location.href = naverLoginUrl;
  };

  const getQueryParam = (param) => {
    const query = new URLSearchParams(window.location.search);
    return query.get(param);
  };

  const extractProvider = (message) => {
    if (message.includes('카카오')) return 'Kakao';
    if (message.includes('구글')) return 'Google';
    if (message.includes('네이버')) return 'Naver';
    return '찾을 수 없습니다.';
  };

  const transProvider = (provider) => {
    if (provider === 'Kakao') return '카카오';
    if (provider === 'Google') return '구글';
    if (provider === 'Naver') return '네이버';
    return '문제가 발생했습니다.';
  };

  useEffect(() => {
    const code = getQueryParam('code');

    if (code) {
      const userInfo = async () => {
        try {
          const response = await axiosInstance.post(
            '/travelo/check',
            formData,
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            }
          );
          const { error, username } = response.data;

          if (error) {
            const provider = extractProvider(error);
            setProvider(provider);
            setUsername(username);
            setShowForm(true);
          } else {
            window.location.href = '/home';
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      };
      userInfo;
    }
  }, []);

  const handleintergration = async (e, provider) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `/travelo/intergrated${provider}`,
        {
          username,
        }
      );

      if (response.status === 200) {
        window.location.href = '/home';
      } else {
        console.error('통합 실패');
      }
    } catch (error) {
      console.error('통합 도중 오류 발생', error);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>네이버 로그인</button>
      {showForm && (
        <>
          <div>
            <form onSubmit={(e) => handleintergration(e, provider)}>
              <button type="submit">
                ${transProvider(provider)}로 계정 통합
              </button>
            </form>
          </div>
          <div>
            <form onSubmit={(e) => handleintergration(e, 'Naver')}>
              <button type="submit">네이버로 계정 통합</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default NaverLoginButton;
