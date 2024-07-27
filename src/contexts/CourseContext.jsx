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
    { name: '서울', code: '1', lat: 37.5665, lng: 126.978 }, // 서울특별시청
    { name: '부산', code: '6', lat: 35.1796, lng: 129.0756 }, // 부산광역시청
    { name: '대구', code: '4', lat: 35.8714, lng: 128.6014 }, // 대구광역시청
    { name: '인천', code: '2', lat: 37.4563, lng: 126.7052 }, // 인천광역시청
    { name: '광주', code: '5', lat: 35.1595, lng: 126.8526 }, // 광주광역시청
    { name: '대전', code: '3', lat: 36.3504, lng: 127.3845 }, // 대전광역시청
    { name: '울산', code: '7', lat: 35.539, lng: 129.3114 }, // 울산광역시청
    { name: '세종', code: '8', lat: 36.4801, lng: 127.2893 }, // 세종특별자치시청
    { name: '경기', code: '31', lat: 37.2752, lng: 127.0092 }, // 경기도청
    { name: '강원', code: '32', lat: 37.8667, lng: 127.72 }, // 강원도청
    { name: '충북', code: '33', lat: 36.6358, lng: 127.4913 }, // 충청북도청
    { name: '충남', code: '34', lat: 36.6588, lng: 126.6728 }, // 충청남도청
    { name: '경북', code: '35', lat: 36.5749, lng: 128.709 }, // 경상북도청
    { name: '경남', code: '36', lat: 35.2384, lng: 128.692 }, // 경상남도청
    { name: '전북', code: '37', lat: 35.82, lng: 127.1088 }, // 전라북도청
    { name: '전남', code: '38', lat: 34.81629, lng: 126.4629 }, // 전라남도청
    { name: '제주', code: '39', lat: 33.4996, lng: 126.5312 }, // 제주특별자치도청
  ];

  const fetchCourses = async (updatedFilters = {}, append = false) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/travelo/place/list', {
        params: {
          ...filters,
          ...updatedFilters,
        },
      });
      setCourses((prevCourses) =>
        append
          ? [...prevCourses, ...response.data.paging.content]
          : response.data.paging.content
      );
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
    if (currentPage > 0) {
      fetchCourses({ page: currentPage }, true);
    }
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
