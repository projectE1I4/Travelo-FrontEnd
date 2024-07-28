import { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../utils/axiosInstance';

const BrowseContext = createContext();

export const useBrowse = () => {
  return useContext(BrowseContext);
};

const BrowseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dropdownTitle, setDropdownTitle] = useState('인기순');
  const [filters, setFilters] = useState({
    page: 0,
    sortBy: 'popularity',
    areaCode: '',
    type: '',
  });
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchCourses = async (updatedFilters = {}) => {
    setLoading(true);
    const accessToken = sessionStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('No access token found');
      setError('No access token found');
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.get('/user/course/list', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          ...filters,
          ...updatedFilters,
        },
      });

      const courses = response.data.paging.content;
      console.log('Fetched courses:', courses);

      const filteredCourses = courses.filter((course) => {
        const matchesAreaCode = filters.areaCode
          ? course.courseList.some(
              (item) => item.place.areaCode === filters.areaCode
            )
          : true;
        const matchesType = filters.type
          ? course.courseList.some((item) => item.place.type === filters.type)
          : true;

        console.log(
          `Course ${course.courseSeq} matchesAreaCode: ${matchesAreaCode}, matchesType: ${matchesType}`
        );

        return matchesAreaCode && matchesType;
      });

      console.log('Filtered courses:', filteredCourses);

      setCourses(filteredCourses);
      setTotalPages(response.data.paging.totalPages);
    } catch (error) {
      setError(error);
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    fetchCourses({ page: currentPage });
  }, [currentPage]);

  const handleDropdownClick = (title) => {
    setDropdownTitle(title);
    fetchCourses({
      sortBy:
        title === '인기순'
          ? 'popularity'
          : title === '최신순'
            ? 'latest'
            : 'oldest',
    });
  };

  const updateFilters = (newFilters) => {
    setFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        ...newFilters,
        page: 0,
      };
      fetchCourses(updatedFilters);
      return updatedFilters;
    });
    setCurrentPage(0);
  };

  const resetFilters = () => {
    const initialFilters = {
      page: 0,
      sortBy: 'popularity',
      areaCode: '',
      type: '',
    };
    setFilters(initialFilters);
    setDropdownTitle('인기순');
    setCurrentPage(0);
    fetchCourses(initialFilters);
  };

  return (
    <BrowseContext.Provider
      value={{
        courses,
        loading,
        error,
        dropdownTitle,
        handleDropdownClick,
        updateFilters,
        resetFilters,
        totalPages,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </BrowseContext.Provider>
  );
};

export { BrowseContext, BrowseProvider };
