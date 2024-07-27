import { createContext, useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const CourseGroupContext = createContext();

const CourseGroupProvider = ({ children }) => {
  const [courseGroups, setCourseGroups] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseGroups = async () => {
      try {
        const response = await axiosInstance.get('/user/group/list');
        setCourseGroups(response.data.courseGroup);
        setLoading(false);
      } catch (error) {
        setError(error.response.data);
        setLoading(false);
      }
    };
    fetchCourseGroups();
  }, []);

  return (
    <CourseGroupContext.Provider value={{ courseGroups, loading, error }}>
      {children}
    </CourseGroupContext.Provider>
  );
};

export { CourseGroupContext, CourseGroupProvider };
