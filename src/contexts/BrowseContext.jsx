import { createContext, useState, useEffect, useCallback } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { fetchCourseBookmarks } from '../services/bookmarkService';
import { useNavigate } from 'react-router-dom';
import { likeCourse } from '../services/likeService';

const BrowseContext = createContext();

const BrowseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [courseDetail, setCourseDetail] = useState(null);
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
  const [courseBookmarks, setCourseBookmarks] = useState([]);
  const [accessToken, setAccessToken] = useState(null);

  const fetchCourses = useCallback(
    async (updatedFilters = {}) => {
      const token = sessionStorage.getItem('accessToken');
      setAccessToken(token);
      if (!accessToken) return;

      setLoading(true);
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
        setCourses(courses);
        setTotalPages(response.data.paging.totalPages);
      } catch (error) {
        setError(error);
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    },
    [filters, accessToken]
  );

  const fetchCourseDetail = useCallback(
    async (courseSeq) => {
      const token = sessionStorage.getItem('accessToken');
      setAccessToken(token);
      if (!accessToken) return;

      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/user/course/detail/${courseSeq}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              page: 0,
              sortBy: 'popularity',
            },
          }
        );
        setCourseDetail(response.data);
      } catch (error) {
        setError(error);
        console.error('Error fetching course detail:', error);
      } finally {
        setLoading(false);
      }
    },
    [accessToken]
  );

  const fetchUserBookmarks = useCallback(async () => {
    if (!accessToken) return;

    try {
      const response = await fetchCourseBookmarks(accessToken);
      setCourseBookmarks(response.bookmarks);
    } catch (error) {
      console.error('북마크 목록 가져오기 실패', error);
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      fetchUserBookmarks();
      fetchCourses();
    }
  }, [accessToken, fetchCourses, fetchUserBookmarks]);

  useEffect(() => {
    fetchCourses({ page: currentPage });
  }, [currentPage, fetchCourses]);

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

  const updateCourseLikes = (courseSeq, liked) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.courseSeq === courseSeq
          ? { ...course, likeCount: course.likeCount + (liked ? 1 : -1) }
          : course
      )
    );
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
        courseBookmarks,
        fetchUserBookmarks,
        fetchCourseDetail,
        courseDetail,
        updateCourseLikes,
      }}
    >
      {children}
    </BrowseContext.Provider>
  );
};

export { BrowseContext, BrowseProvider };
