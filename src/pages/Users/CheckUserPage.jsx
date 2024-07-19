import CheckUser from '../../components/Auth/CheckUser';
import authService from '../../services/authService';

const CheckUserPage = () => {
  const checkUserName = async (username) => {
    try {
      const response = await authService.checkUser(username);
      console.log('checkuserpage:', response);
      return response;
    } catch (error) {
      console.error('checkuserpage error :', error);
      return false;
    }
  };

  return <CheckUser onCheckUser={checkUserName} />;
};

export default CheckUserPage;
