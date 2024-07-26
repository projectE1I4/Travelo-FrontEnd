import CheckUser from '../../components/Auth/CheckUser';
import authService from '../../services/authService';

const CheckUserPage = () => {
  const checkUserName = async (username) => {
    try {
      const response = await authService.onCheckUser(username);
      console.log('checkuserpage:', response);
      return response;
    } catch (error) {
      console.error('checkuserpage error :', error);
      return false;
    }
  };

  return (
    <div className="grid-container">
      <CheckUser onCheckUser={checkUserName} />
    </div>
  );
};

export default CheckUserPage;
