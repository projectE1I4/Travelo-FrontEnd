import { useState } from 'react';

const useMailCheck = (onMailCheck) => {
  const [mailCheckSuccess, setMailCheckSuccess] = useState(false);

  const handleMailCheck = async (username) => {
    console.log('onMailCheck:', onMailCheck); // Check if onMailCheck is a function
    try {
      // result는 인증 코드가 돌아옴
      const result = await onMailCheck(username);

      if (result !== undefined) {
        setMailCheckSuccess(true);
      } else {
        console.log('Invalid result from mailcheck:', result);
      }
    } catch (error) {
      console.error('Mail check error:', error);
    }
  };

  return [mailCheckSuccess, handleMailCheck];
};

export default useMailCheck;
