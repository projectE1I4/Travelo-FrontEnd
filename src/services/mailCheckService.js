import axiosInstance from '../utils/axiosInstance';

const mailConfirm = async (username) => {
  try {
    const formData = new URLSearchParams();
    formData.append('username', username);
    console.log('formData', formData);

    const response = await axiosInstance.post(
      '/travelo/mailConfirm',
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    console.log(response.data);
    if (response) {
      console.log('인증 시도 성공 : ', response.data);
      return response.data;
    } else {
      console.log('인증 시도 실패 : ', response.data);
      return { success: false };
    }
  } catch (error) {
    console.error('인증 불가 : ', error);
    throw error;
  }
};

const verifyCode = async (username, verifyCode) => {
  console.log(username, verifyCode);
  try {
    if (username && verifyCode) {
      const response = await axiosInstance.post('/travelo/verifyCode', {
        username: username,
        verifyCode: verifyCode,
      });
      console.log(response.data);
      if (response.data) {
        console.log('인증 성공');
        localStorage.setItem('verifyCodeCheck', true);
        return response.data;
      } else {
        console.log('일치하지 않습니다.');
        localStorage.setItem('verifyCodeCheck', false);
        return response.data;
      }
    } else {
      console.error('이메일 혹은 인증 코드 불일치');
    }
  } catch (error) {
    console.error('인증 실패', error);
    localStorage.setItem('verifyCodeCheck', false);
    return false;
  }
};

export default {
  mailConfirm,
  verifyCode,
};
