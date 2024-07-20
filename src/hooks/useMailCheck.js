import { useState } from 'react';

const useMailCheck = (onMailCheck) => {
  const [mailCheckSuccess, setMailCheckSuccess] = useState(false);

  const handleMailCheck = async (username) => {
    console.log('onMailCheck:', onMailCheck); // Check if onMailCheck is a function
    console.log('username : ', username);
    if (typeof onMailCheck === 'function') {
      try {
        // result는 인증 코드가 돌아옴
        console.log('여까지');
        if (typeof onMailCheck === 'function') {
          const result = await onMailCheck(username);
          setMailCheckSuccess(result.success);
        } else {
          console.error('onMailCheck가 함수가 아닙니다.');
        }
        console.log(result);
        console.log('여까지1');

        if (result !== undefined) {
          setMailCheckSuccess(true);
        } else {
          console.log('Invalid result from mailcheck:', result);
          setMailCheckSuccess(false);
        }
      } catch (error) {
        console.error('Mail check error:', error);
        setMailCheckSuccess(false);
      }
    } else {
      console.error('onMailCheck가 함수가 아닙니다.');
    }
  };

  return [mailCheckSuccess, handleMailCheck];
};

export default useMailCheck;
