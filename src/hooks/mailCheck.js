import { useEffect, useState } from 'react';
import mailCheckService from '../services/mailCheckService.js';

export const mailCheck = () => {
  const [isMailCheck, setIsMailCheck] = useState(false);

  useEffect(() => {
    const checkMail = () => {
      const result = mailCheckService.isMailCheck();
      setIsMailCheck(result);
    };

    checkMail;
  }, []);

  const handleMailCheck = async (e) => {
    e.preventDefault();
    const result = await mailCheckService.MailCheck(username);
    setMailCheckSuccess(result.success);
  };

  const handleVerifyCodeCheck = async (e) => {
    e.preventDefault();
    const result = await mailCheckService.verifyCode(username, verifyCode);
    setMailCheckSuccess(result);
  };
  return { handleMailCheck, handleVerifyCodeCheck };
};
