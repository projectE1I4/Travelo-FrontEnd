import React from 'react';

const GoogleLoginButton = () => {
  const googleClientId = import.meta.env.VITE_API_GOOGLE_CLIENT_ID;
  const redirectUri = 'http://localhost:8080/travelo/googleCallback';
  const scope =
    'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';
  const handleLogin = () => {
    const googleLoginUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=${encodeURIComponent(scope)}`;
    window.location.href = googleLoginUrl;
  };

  return <button onClick={handleLogin}>구글 로그인</button>;
};

export default GoogleLoginButton;
