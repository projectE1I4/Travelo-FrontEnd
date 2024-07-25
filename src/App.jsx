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
import PlacesList from './pages/PlacesList';
import MyReviewPage from './pages/MyReviewPage';
import CourseDetail from './course/CourseDetail';
import MyCoursePage from './pages/MyCoursePage';
import MyCourseEditPage from './pages/MyCourseEditPage';

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/places" element={<PlacesListPage />} />
          <Route path="/places/:placeSeq" element={<PlaceDetailPage />} />
          <Route path="/places" element={<PlacesList />} />
          <Route path="/myReviews" element={<MyReviewPage />} />
          <Route path="/myCourses" element={<MyCoursePage />} />
          <Route path="/courseEdit/:courseSeq" element={<MyCourseEditPage />} />
          <Route path="/course/:courseSeq" element={<CourseDetail />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/users/login" element={<LoginPage />} />
          <Route path="/users/register" element={<RegisterPage />} />
          <Route path="/users/checkUser" element={<CheckUserPage />} />
          <Route path="/users/resetPassword" element={<ResetPasswordPage />} />
          <Route path="/googleCallback" element={GoogleCallback} />
          <Route
            path="/social/integrate"
            element={<AccountIntergrationPage />}
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
