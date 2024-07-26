import { useState } from 'react';

const useMailCheck = (onMailCheck) => {
  const [mailCheckSuccess, setMailCheckSuccess] = useState(false);

  const handleMailCheck = async (username, e) => {
    e.preventDefault();
    console.log('username : ', username);
    if (typeof onMailCheck === 'function') {
      try {
        // result는 인증 코드가 돌아옴
        const result = await onMailCheck(username);
        setMailCheckSuccess(true);
        return result.data;
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
