import { useAuth } from './hooks/useAuth';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/users/LoginPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/users/RegisterPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import CheckUserPage from './pages/users/CheckUserPage';
import ResetPasswordPage from './pages/users/ResetPasswordPage';
import Header from './components/common/Header';
import PlacesListPage from './pages/Place/PlacesListPage.jsx';
import PlaceDetailPage from './pages/Place/PlaceDetailPage.jsx';
import AccountIntergrationPage from './pages/users/AccountIntegrationPage.jsx';
import GoogleCallback from './components/socialAuth/GoogleCallback.jsx';
import KakaoCallback from './components/socialAuth/KakaoCallback.jsx';
import NaverCallback from './components/socialAuth/NaverCallback.jsx';
import AccountIntergration from './components/socialAuth/AccountIntegration.jsx';
import AccountIntergrationKakao from './components/socialAuth/AccountIntegrationKakao.jsx';
import ModifyuserPage from './pages/users/ModifyUserPage.jsx';
import ModifyUserPage from './pages/users/ModifyUserPage.jsx';

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/places" element={<PlacesListPage />} />
          <Route path="/places/:placeSeq" element={<PlaceDetailPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/users/login" element={<LoginPage />} />
          <Route path="/users/register" element={<RegisterPage />} />
          <Route path="/users/checkUser" element={<CheckUserPage />} />
          <Route path="/users/resetPassword" element={<ResetPasswordPage />} />
          <Route path="/travelo/naverCallback" element={<NaverCallback />} />
          <Route path="/travelo/googleCallback" element={<GoogleCallback />} />
          <Route path="/travelo/kakaoCallback" element={<KakaoCallback />} />
          <Route
            path="/social/integrate"
            element={<AccountIntergrationPage />}
          />
          <Route
            path="/social/integratedComplete"
            element={<AccountIntergration />}
          />
          <Route
            path="/travelo/integratedKakao"
            element={<AccountIntergrationKakao />}
          />

          <Route path="mypage/modifyprofile" element={<ModifyUserPage />} />
          <Route
            path="/protected"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
