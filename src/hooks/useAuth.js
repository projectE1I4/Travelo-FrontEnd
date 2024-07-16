// userAuth hook
import { useEffect, useState } from 'react';
import authService from '../services/authService.js';

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

      if (success) {
        setIsAuthenticated(true);
      }
      return success;
    } catch (error) {
      console.error('로그인 요청 중 오류 발생: ', error);
      return false;
    }
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};
