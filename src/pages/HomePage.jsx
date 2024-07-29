import React from 'react';
import Home from '../components/home/Home';
import { useAuth } from '../hooks/useAuth';

const HomePage = () => {
  const { logout, user, isAuthenticated } = useAuth();

  console.log('user', user);
  console.log('isAuten', isAuthenticated);
  return (
    <div>
      <Home onLogout={logout} />
      {isAuthenticated ? (
        <p>{user ? `${user.username} 접속` : `로딩 중...`}</p>
      ) : (
        <>
          <a href="/users/register">회원가입</a>
          <br />
          <a href="/users/login">로그인</a>
          <br />
          <a href="/users/checkUser">비밀번호 재설정</a>
        </>
      )}
    </div>
  );
};

export default HomePage;
