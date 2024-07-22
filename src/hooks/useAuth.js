// userAuth hook
import { useEffect, useState } from 'react';
import authService from '../services/authService.js';
import axiosInstance from '../utils/axiosInstance.js';

export const useAuth = () => {
  // 인증 상태관리
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 토큰 관리
  useEffect(() => {
    const checkAuth = () => {
      const result = authService.isAuthenticated();
      setIsAuthenticated(result);
    };

    checkAuth;
  }, []);

  const login = async (email, password) => {
    try {
      const success = await authService.login(email, password);
      console.log('success', success);
      if (success) {
        setIsAuthenticated(true);
      }
      return success;
    } catch (error) {
      console.error('로그인 요청 중 오류 발생: ', error);
      return false;
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

  return { isAuthenticated, login, logout };
};
