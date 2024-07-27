import { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../utils/axiosInstance';

const CourseContext = createContext();

export const useCourse = () => {
  return useContext(CourseContext);
};

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    item: 15,
    page: 0,
    keyword: '',
    sorts: 'popular',
    content: '',
    area: '',
  });
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [dropdownTitle, setDropdownTitle] = useState('인기순');
  const [selectedRegion, setSelectedRegion] = useState(null);

  const regions = [
    { name: '서울', code: '1' },
    { name: '부산', code: '6' },
    { name: '대구', code: '4' },
    { name: '인천', code: '2' },
    { name: '광주', code: '5' },
    { name: '대전', code: '3' },
    { name: '울산', code: '7' },
    { name: '세종', code: '8' },
    { name: '경기', code: '31' },
    { name: '강원', code: '32' },
    { name: '충북', code: '33' },
    { name: '충남', code: '34' },
    { name: '경북', code: '35' },
    { name: '경남', code: '36' },
    { name: '전북', code: '37' },
    { name: '전남', code: '38' },
    { name: '제주', code: '39' },
  ];

  const fetchCourses = async (updatedFilters = {}) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/travelo/place/list', {
        params: {
          ...filters,
          ...updatedFilters,
        },
      });
      setCourses(response.data.paging.content);
      setTotalPages(response.data.paging.totalPages);
    } catch (error) {
      setError(error);
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
    fetchCourses({ sorts: title === '인기순' ? 'popular' : '' });
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
    setCurrentPage(0); // 페이지 필터링 시 첫 페이지로 이동
  };

  const resetFilters = (additionalFilters = {}) => {
    const initialFilters = {
      item: 15,
      page: 0,
      keyword: '',
      sorts: 'popular',
      content: '',
      area: selectedRegion,
      ...additionalFilters,
    };
    setFilters(initialFilters);
    setDropdownTitle('인기순');
    setCurrentPage(0);
    fetchCourses(initialFilters);
  };

  return (
    <CourseContext.Provider
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
        selectedRegion,
        setSelectedRegion,
        regions,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
