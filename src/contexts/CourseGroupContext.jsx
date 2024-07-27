import { createContext, useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const CourseGroupContext = createContext();

const CourseGroupProvider = ({ children }) => {
  const [courseGroups, setCourseGroups] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchCourseGroups = async () => {
    try {
      const response = await axiosInstance.get('/user/group/list');
      setCourseGroups(response.data.courseGroup);
      setLoading(false);
      setTotalPages(length(response.data.courseGroup) / 9 + 1);
    } catch (error) {
      setError(error.response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseGroups({ page: currentPage });
  }, [currentPage]);

  return (
    <CourseGroupContext.Provider value={{ courseGroups, loading, error }}>
      {children}
    </CourseGroupContext.Provider>
  );
};

export { CourseGroupContext, CourseGroupProvider };
