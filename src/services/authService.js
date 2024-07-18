// authService : axios, 토큰 처리

import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const register = async (username, password, passwordCheck, tel) => {
  if (localStorage.getItem('verifyCodeCheck')) {
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('passwordCheck', passwordCheck);
      formData.append('tel', tel);
      console.log('tel', tel);

      const response = await axiosInstance.post('/travelo/join', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      console.log('회원가입 성공');
      console.log(response.data);
      if (response.data === '가입 되었습니다') {
        return true;
      }
      return false;
    } catch (error) {
      console.error('회원가입 실패 : ', error);
      return false;
    }
  } else {
    console.error('인증 실패 : ', error);
    return false;
  }
};

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
  register,
  login,
  logout,
  isAuthenticated,
};
