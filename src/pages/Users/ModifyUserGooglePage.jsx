import ModifyUser from '../../components/auth/ModifyUser';
import ModifyUserGoogle from '../../components/auth/ModifyUserGoogle';
import MyPageSidebar from '../../components/common/MyPageSidebar';
import mailCheckService from '../../services/mailCheckService';

const ModifyUserGooglePage = () => {
  const mailcheck = async (username) => {
    try {
      console.log('mailcheck called with username:', username); // 디버깅용 로그
      const response = await mailCheckService.mailConfirm(username);
      console.log('Mail check response:', response); // 디버깅용 로그
      return response;
    } catch (error) {
      console.error('Mail check error:', error); // 오류 로그
      return { success: false };
    }
  };

  const verifycodecheck = async (username, verifyCode) => {
    try {
      console.log(
        'verifycodecheck called with username:',
        username,
        'and verifyCode:',
        verifyCode
      ); // 디버깅용 로그
      const response = await mailCheckService.verifyCode(username, verifyCode);
      console.log('Verify code check response:', response); // 디버깅용 로그
      return response;
    } catch (error) {
      console.error('Verify code check error:', error); // 오류 로그
      return false;
    }
  };
  return (
    <div className="grid-container">
      <MyPageSidebar />
      <ModifyUserGoogle />
    </div>
  );
};

export default ModifyUserGooglePage;
