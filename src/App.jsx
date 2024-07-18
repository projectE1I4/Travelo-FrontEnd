import React from 'react';
import './App.css';
import { useAuth } from './hooks/useAuth';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Users/LoginPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/Users/RegisterPage';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import ResetPassword from './components/Auth/ResetPassword';

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/users/login" element={<LoginPage />} />
      <Route path="/users/register" element={<RegisterPage />} />
      <Route path="/users/resetPassword" element={<ResetPassword />} />
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
  );
};

export default App;
