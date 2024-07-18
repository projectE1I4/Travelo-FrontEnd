import { useState } from 'react';

const useMailCheck = (onMailCheck) => {
  const [mailCheckSuccess, setMailCheckSuccess] = useState(false);

  const handleMailCheck = async (username, e) => {
    e.preventDefault();
    console.log('handleMailCheck called with username:', username); // 디버깅용 로그
    try {
      const result = await onMailCheck(username);
      console.log('result::::' + result);

      if (result && result.success !== undefined) {
        setMailCheckSuccess(result.success);
      } else {
        console.error('Invalid result from mailcheck:', error, result);
      }
    } catch (error) {
      console.error('Mail check error:');
    }
  };

  return [mailCheckSuccess, handleMailCheck];
};

export default useMailCheck;
