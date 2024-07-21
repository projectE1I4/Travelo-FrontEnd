import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyReviewPage from './pages/MyReviewPage';
import CourseDetail from './course/CourseDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/myReviews" element={<MyReviewPage />} />
        <Route path="/course/:courseSeq" element={<CourseDetail />} />
        <Route path="/" element={<h1>홈 페이지</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
