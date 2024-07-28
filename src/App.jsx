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
import GoogleCallback from './components/socialAuth/GoogleCallback.jsx';
import MyReviewPage from './pages/MyReviewPage';
import CourseDetail from './course/CourseDetail';
import MyCoursePage from './pages/MyCoursePage';
import MyCourseEditPage from './pages/MyCourseEditPage';
import AdminMainPage from './pages/Admin/AdminMainPage.jsx';
import AdminUserPage from './pages/Admin/AdminUserPage';
import AdminGroupPage from './pages/Admin/AdminGroupPage.jsx';
import AdminReviewPage from './pages/Admin/AdminReviewPage.jsx';
import AdminBlindReviewPage from './pages/Admin/AdminBlindReviewPage';
import AccountIntergrationPage from './pages/users/AccountIntegrationPage.jsx';
import KakaoCallback from './components/socialAuth/KakaoCallback.jsx';
import NaverCallback from './components/socialAuth/NaverCallback.jsx';
import AccountIntergration from './components/socialAuth/AccountIntegration.jsx';
import AccountIntergrationKakao from './components/socialAuth/AccountIntegrationKakao.jsx';
import ModifyUserPage from './pages/users/ModifyUserPage.jsx';
import ModifyUserGooglePage from './pages/users/ModifyUserGooglePage.jsx';
import AccountIntergrationGoogle from './components/socialAuth/AccountIntegrationGoogle.jsx';
import AccountIntergrationNaver from './components/socialAuth/AccountIntegrationNaver.jsx';
import ModifyUserNaverPage from './pages/users/ModifyUserNaverPage.jsx';
import ModifyUserKakaoPage from './pages/users/ModifyUserKakaoPage.jsx';
import CourseGroupList from './components/courseGroup/CourseGroupList.jsx';
import CourseGroupListPage from './pages/courseGroup/CourseGroupListPage.jsx';
import { CourseGroupProvider } from './contexts/CourseGroupContext.jsx';
import AdminUserDetail from './components/Admin/AdminUserDetail.jsx';

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/places" element={<PlacesListPage />} />
          <Route path="/places/:placeSeq" element={<PlaceDetailPage />} />
          <Route path="mypage/myReviews" element={<MyReviewPage />} />
          <Route path="mypage/myCourses" element={<MyCoursePage />} />
          <Route path="/courseEdit/:courseSeq" element={<MyCourseEditPage />} />
          <Route path="/course/:courseSeq" element={<CourseDetail />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/users/login" element={<LoginPage />} />
          <Route path="/users/register" element={<RegisterPage />} />
          <Route path="/users/checkUser" element={<CheckUserPage />} />
          <Route path="/users/resetPassword" element={<ResetPasswordPage />} />
          <Route path="/admin" element={<AdminMainPage />} />
          <Route path="admin/users" element={<AdminUserPage />} />
          <Route path="/admin/groups" element={<AdminGroupPage />} />
          <Route path="/admin/reviews" element={<AdminReviewPage />} />
          <Route
            path="/admin/userDetail/:userSeq"
            element={<AdminUserDetail />}
          />
          <Route
            path="/admin/blindReviews"
            element={<AdminBlindReviewPage />}
          />
          <Route path="/googleCallback" element={GoogleCallback} />
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
