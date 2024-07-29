import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import axiosInstance from '../utils/axiosInstance';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(
    sessionStorage.getItem('accessToken') || null
  );

  const checkAuth = async () => {
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
  }, [accessToken]);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      const token = response.data;

      sessionStorage.setItem('accessToken', token.accessToken);
      sessionStorage.setItem('refreshToken', token.refreshToken);
      setAccessToken(token.accessToken);
      setIsAuthenticated(true);
      setUser(token.user);
      return response;
    } catch (error) {
      console.error('로그인 요청 중 오류 발생: ', error);
      return { status: error.response?.status, data: error.response?.data };
    }
  };

  const logout = async () => {
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
    setAccessToken(null);
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = '/users/login';
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, accessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
