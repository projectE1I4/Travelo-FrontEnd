import ModifyUser from '../../components/auth/ModifyUser';
import MyPageSidebar from '../../components/common/MyPageSidebar';

const ModifyUserPage = () => {
  return (
    <div className="grid-container">
      <MyPageSidebar />
      <ModifyUser />
    </div>
  );
};

export default ModifyUserPage;
