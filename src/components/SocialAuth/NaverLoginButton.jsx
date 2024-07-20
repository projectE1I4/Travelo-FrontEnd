import React from 'react';

const NaverLoginButton = () => {
  const naverClientId = import.meta.env.VITE_API_NAVER_CLIENT_ID;

  const handleLogin = () => {
    const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&state=STATE_STRING&redirect_uri=http://localhost:8080/travelo/naverCallback`;
    console.log('naverLoginUrl', naverLoginUrl);
    window.location.href = naverLoginUrl;
  };

  return <button onClick={handleLogin}>네이버 로그인</button>;
};

export default NaverLoginButton;
