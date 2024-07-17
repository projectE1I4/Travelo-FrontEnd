// authService : axios, 토큰 처리

import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';

const login = async (username, password) => {
  try {
    const response = await axiosInstance.post('/travelo/login', {
      username: username,
      password: password,
    });

    const token = response.data;

    localStorage.setItem('token', token);
    if (localStorage.getItem('token')) {
      console.log('로그인 성공');
    }
  } catch (error) {
    console.error('로그인 실패: ', error);
  }
};

const logout = () => {
  localStorage.removeItem('token');
};

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token !== null;
};

export default {
  login,
  logout,
  isAuthenticated,
};
