import { useAuth } from './hooks/useAuth';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Users/LoginPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/Users/RegisterPage';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import CheckUserPage from './pages/Users/CheckUserPage';
import ResetPasswordPage from './pages/Users/ResetPasswordPage';
import Header from './components/common/Header';
import PlacesListPage from './pages/Place/PlacesListPage.jsx';
import PlaceDetailPage from './pages/Place/PlaceDetailPage.jsx';
import AccountIntergrationPage from './pages/Users/AccountIntergrationPage.jsx';
import GoogleCallback from './components/SocialAuth/GoogleCallback.jsx';
import KakaoCallback from './components/SocialAuth/KakaoCallback.jsx';
import NaverCallback from './components/SocialAuth/NaverCallback.jsx';
import CourseCustomPage from './pages/courseCustom/CourseCustomPage.jsx';
import BrowseCoursesPage from './pages/browseCourses/BrowseCoursesPage.jsx';

const App = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/places" element={<PlacesListPage />} />
          <Route path="/places/:placeSeq" element={<PlaceDetailPage />} />
          <Route
            path="/course-custom"
            element={
              <ProtectedRoute>
                <CourseCustomPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/browse-courses"
            element={
              <ProtectedRoute>
                <BrowseCoursesPage />
              </ProtectedRoute>
            }
          />
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
            path="/protected"
            element={
              <ProtectedRoute>
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
