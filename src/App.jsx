import { useAuth } from './hooks/useAuth';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/users/LoginPage.jsx';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/users/RegisterPage.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import CheckUserPage from './pages/users/CheckUserPage.jsx';
import ResetPasswordPage from './pages/users/ResetPasswordPage.jsx';
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
import ModifyUserGooglePage from './pages/users/ModifyUserGooglePage.jsx';
import AccountIntergrationGoogle from './components/socialAuth/AccountIntegrationGoogle.jsx';
import AccountIntergrationNaver from './components/socialAuth/AccountIntegrationNaver.jsx';
import ModifyUserNaverPage from './pages/users/ModifyUserNaverPage.jsx';
import ModifyUserKakaoPage from './pages/users/ModifyUserKakaoPage.jsx';
import CourseGroupList from './components/courseGroup/CourseGroupList.jsx';
import CourseGroupListPage from './pages/courseGroup/CourseGroupListPage.jsx';
import { CourseGroupProvider } from './contexts/CourseGroupContext.jsx';
import CourseGroupDetailPage from './pages/courseGroup/CourseGroupDetailPage.jsx';
import CourseGroupCreatePage from './pages/courseGroup/CourseGroupCreatePage.jsx';
import CourseGroupModifyPage from './pages/courseGroup/CourseGroupCreateModalPage.jsx';
import { useEffect, useState } from 'react';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // 초기 인증 상태를 확인합니다. 예를 들어, 세션 스토리지에서 토큰을 확인.
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token) => {
    sessionStorage.setItem('accessToken', token);
    setIsAuthenticated(true);
  };
  return (
    <div>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/places" element={<PlacesListPage />} />
          <Route path="/places/:placeSeq" element={<PlaceDetailPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route
            path="/users/login"
            element={<LoginPage onLogin={handleLogin} />}
          />
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
          <Route
            path="/travelo/integratedGoogle"
            element={<AccountIntergrationGoogle />}
          />
          <Route
            path="/travelo/integratedNaver"
            element={<AccountIntergrationNaver />}
          />

          <Route path="mypage/modifyprofile" element={<ModifyUserPage />} />
          <Route
            path="mypage/modifyprofileGoogle"
            element={<ModifyUserGooglePage />}
          />
          <Route
            path="mypage/modifyprofileNaver"
            element={<ModifyUserNaverPage />}
          />
          <Route
            path="mypage/modifyprofileKakao"
            element={<ModifyUserKakaoPage />}
          />
          <Route path="mypage/courseGroup" element={<CourseGroupListPage />} />
          <Route
            path="mypage/courseGroupDetail/:id"
            element={<CourseGroupDetailPage />}
          />
          <Route
            path="courseGroup/create"
            element={<CourseGroupCreatePage />}
          />
          <Route
            path="courseGroup/modify/:id"
            element={<CourseGroupModifyPage />}
          />
          <Route
            path="courseGroup/create"
            element={<CourseGroupCreatePage />}
          />
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
