// userAuth hook
import { useEffect, useState } from 'react';
import authService from '../services/authService.js';
import axiosInstance from '../utils/axiosInstance.js';

export const useAuth = () => {
  // 인증 상태관리
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // 토큰 관리
  useEffect(() => {
    const checkAuth = async () => {
      console.log('checkAuth 함수 실행'); // useEffect 훅이 실행되는지 확인
      const result = authService.isAuthenticated();
      console.log('isAuthenticated:', result); // isAuthenticated 함수의 반환 값 확인
      setIsAuthenticated(result);

      if (result) {
        console.log('인증됨');
        try {
          const accessToken = sessionStorage.getItem('accessToken');
          console.log('accessToken:', accessToken); // accessToken이 있는지 확인
          const response = await axiosInstance.get('/user/mypage', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          console.log('사용자 정보:', response.data); // 사용자 정보 확인
          setUser(response.data);
        } catch (error) {
          console.error('사용자 정보를 가져오는 중 오류 발생 : ', error);
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const success = await authService.login(email, password);
      if (success) {
        setIsAuthenticated(true);
      }
      console.log('access"');
      sessionStorage.setItem('token', token);
      setIsAuthenticated(true);
      return success;
    } catch (error) {
      console.error('로그인 요청 중 오류 발생: ', error);
      return { status: error.response?.status, data: error.response?.data };
    }
  };

  const logout = async () => {
    try {
      const accessToken = sessionStorage.getItem('accessToken');
      if (accessToken) {
        await axiosInstance.post(
          '/user/logout',
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      }

      sessionStorage.removeItem('accessToken');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('token');
      sessionStorage.removeItem('refreshToken');
      sessionStorage.removeItem('token');
      setIsAuthenticated(false);

      console.log('토큰 지워짐');
      if (!sessionStorage.getItem('refreshToken')) {
        console.log('토큰 지워짐');
      }

      window.location.href = '/users/login';
    } catch (error) {
      console.error('로그아웃 실패 : ', error);
    }
  };

  return { isAuthenticated, user, login, logout };
};
