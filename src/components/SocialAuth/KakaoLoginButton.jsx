import React from 'react';

const KakaoLoginButton = () => {
  const kakaoKey = import.meta.env.VITE_API_KAKAO_KEY;
  const redirectUri = 'http://localhost:8080/travelo/kakaoCallback';

  const handleLogin = () => {
    const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoKey}&redirect_uri=${redirectUri}`;
    window.location.href = kakaoLoginUrl;
  };

  return <button onClick={handleLogin}>카카오 로그인</button>;
};

export default KakaoLoginButton;
