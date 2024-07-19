import { useState } from 'react';

const useVerifyCodeCheck = (onVerifyCodeCheck) => {
  const [verifyCodeCheckSuccess, setVerifyCodeCheckSuccess] = useState(false);

  const handleVerifyCodeCheck = async (username, verifyCode, e) => {
    e.preventDefault();
    try {
      const result = await onVerifyCodeCheck(username, verifyCode);
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
