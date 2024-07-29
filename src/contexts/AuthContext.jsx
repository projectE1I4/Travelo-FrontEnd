import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (!accessToken) {
      setIsAuthenticated(false);
      setUser(null);
      return;
    }

    try {
      const response = await axiosInstance.get('/user/mypage', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setIsAuthenticated(true);
      setUser(response.data);
    } catch (error) {
      console.error('사용자 정보를 가져오는 중 오류 발생 : ', error);
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      const token = response.data;

      sessionStorage.setItem('accessToken', token.accessToken);
      sessionStorage.setItem('refreshToken', token.refreshToken);
      setIsAuthenticated(true);
      setUser(token.user);
      await checkAuth();
      return response;
    } catch (error) {
      console.error('로그인 요청 중 오류 발생: ', error);
      return { status: error.response?.status, data: error.response?.data };
    }
  };

  const logout = async () => {
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
    sessionStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = '/users/login';
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
