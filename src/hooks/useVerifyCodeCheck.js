import { useState } from 'react';

const useVerifyCodeCheck = (onVerifyCodeCheck) => {
  const [verifyCodeCheckSuccess, setVerifyCodeCheckSuccess] = useState(false);

  const handleVerifyCodeCheck = async (username, verifyCode, e) => {
    e.preventDefault();
    console.log(
      'handleVerifyCodeCheck called with username:',
      username,
      'verifyCode:',
      verifyCode
    ); // 디버깅용 로그
    try {
      const result = await onVerifyCodeCheck(username, verifyCode);
      console.log('vresult::::', result); // 디버깅용 로그

      if (result !== undefined) {
        setVerifyCodeCheckSuccess(result);
      } else {
        console.error('Invalid result from verifyCodeCheck:', result); // 오류 로그
      }
    } catch (error) {
      console.error('Verify code check error:', error); // 오류 로그
    }
  };

  return [verifyCodeCheckSuccess, handleVerifyCodeCheck];
};

export default useVerifyCodeCheck;
