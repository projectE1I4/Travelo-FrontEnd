import { useState } from 'react';

const useVerifyCodeCheck = (onVerifyCodeCheck) => {
  const [verifyCodeCheckSuccess, setVerifyCodeCheckSuccess] = useState(false);

  const handleVerifyCodeCheck = async (username, verifyCode, e) => {
    e.preventDefault();
    try {
      const success = await onVerifyCodeCheck(username, verifyCode);
      setVerifyCodeCheckSuccess(success);
      return success;
    } catch (error) {
      console.error('Verify code check error:', error); // 오류 로그
      setVerifyCodeCheckSuccess(false);
      return false;
    }
  };

  return [verifyCodeCheckSuccess, handleVerifyCodeCheck];
};

export default useVerifyCodeCheck;
