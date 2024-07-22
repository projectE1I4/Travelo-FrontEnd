// authService : axios, 토큰 처리

import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const register = async (username, password, passwordCheck, tel) => {
  if (localStorage.getItem('verifyCodeCheck')) {
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('passwordCheck', passwordCheck);
      formData.append('tel', tel);

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

    sessionStorage.setItem('token', token);
    localStorage.setItem('token', token);
    if (sessionStorage.getItem('token')) {
      console.log('로그인 성공');
      return response;
    } else if (localStorage.getItem('token')) {
      console.log('로그인 성공 (로컬 스토리지)');
      return response;
    }
  } catch (error) {
    console.error('로그인 실패: ', error);
    throw error;
  }
};

const logout = async () => {
  const response = await axiosInstance.post('/user/logout');

  const navigate = useNavigate();

  if (response) {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate('/');
  }
};

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token !== null;
};

const onCheckUser = async (username) => {
  try {
    const formData = new URLSearchParams();
    formData.append('username', username);

    const checkUserResponse = await axiosInstance.post(
      '/travelo/check',
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    console.log('응답:', checkUserResponse.data);
    if (checkUserResponse.data === '유효한 이메일입니다') {
      return true;
    } else if (checkUserResponse.data === '해당하는 정보가 없습니다.') {
      return false;
    }
  } catch (error) {
    console.error('check error 발생: ', error);
    return false;
  }
};

const resetPassword = async (newPassword, confirmPassword, username) => {
  console.log(newPassword, confirmPassword);
  console.log(sessionStorage.getItem('username'));
  sessionStorage.setItem('username', username);
  try {
    const resetPasswordResponse = await axiosInstance.post(
      '/travelo/resetPassword',
      null,
      {
        params: {
          password: newPassword,
          passwordCheck: confirmPassword,
        },
      }
    );
    console.log('비밀번호 재설정 응답: ', resetPasswordResponse.data);
    return resetPasswordResponse.data;
  } catch (error) {
    console.error('resetPassword Error', error);
    throw error.response;
  }
};

export default {
  register,
  login,
  logout,
  isAuthenticated,
  resetPassword,
  onCheckUser,
};
