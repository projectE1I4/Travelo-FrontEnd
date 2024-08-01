import React, { useState } from 'react';

// 이메일과 비밀번호의 정규 표현식 패턴
const EMAIL_PATTERN = /^[\w\.-]+@[\w\.-]+\.[a-z]{2,}$/i;
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,20}$/;

const useValidation = () => {
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');

  const validateEmail = (email) => EMAIL_PATTERN.test(email);
  const validatePassword = (password) => PASSWORD_PATTERN.test(password);

  const correctEmail = (value) => {
    if (!validateEmail(value)) {
      setUsernameError('유효한 이메일 주소를 입력해주세요.');
      return false;
    } else {
      setUsernameError('');
      return true;
    }
  };

  const correctPassword = (value) => {
    if (!validatePassword(value)) {
      setPasswordError(
        '8자 이상, 20자 이하이며, 숫자와 소문자를 포함해야 합니다.'
      );
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const equalPassword = (password, confirmPassword) => {
    if (password === confirmPassword) {
      setPasswordConfirmError('');
      return true;
    } else {
      setPasswordConfirmError('비밀번호가 일치하지 않습니다.');
      return false;
    }
  };

  return {
    usernameError,
    passwordError,
    passwordConfirmError,
    correctEmail,
    correctPassword,
    equalPassword,
  };
};

export default useValidation;
