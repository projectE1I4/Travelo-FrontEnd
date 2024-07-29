import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated }) => {
  console.log('프.라', isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/users/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
