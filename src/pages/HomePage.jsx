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
      <a href="/users/register">회원가입</a>
      <br />
      <a href="/users/login">로그인</a>
      <br />
      <a href="/users/checkUser">비밀번호 재설정</a>
      <br />
      <a href="mypage/myCourses">나의 코스</a>
      <br />
      <a href="mypage/myReviews">나의 후기</a>
      <br />
      <a href="/admin">관리자 대시보드</a>
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
