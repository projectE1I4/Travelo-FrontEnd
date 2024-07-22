import { createContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

const PlaceContext = createContext();

const PlaceProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownTitle, setDropdownTitle] = useState('인기순');
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

  const fetchPlaces = async (updatedFilters) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/travelo/place/list', {
        params: {
          ...filters,
          ...updatedFilters,
        },
      });
      setPlaces(response.data.paging.content);
      setTotalPages(response.data.paging.totalPages);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces(filters);
  }, []);

  useEffect(() => {
    fetchPlaces({ page: currentPage });
  }, [currentPage]);

  const handleDropdownClick = (title) => {
    setDropdownTitle(title);
    fetchPlaces({ sorts: title === '인기순' ? 'popular' : '' });
  };

  const updateFilters = (newFilters) => {
    setFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        ...newFilters,
        page: 0,
      };
      fetchPlaces(updatedFilters);
      return updatedFilters;
    });
    setCurrentPage(0); // 페이지 필터링 시 첫 페이지로 이동
  };

  const resetFilters = () => {
    const initialFilters = {
      item: 15,
      page: 0,
      keyword: '',
      sorts: 'popular',
      content: '',
      area: '',
    };
    setFilters(initialFilters);
    setDropdownTitle('인기순');
    setCurrentPage(0);
    fetchPlaces(initialFilters);
  };

  return (
    <PlaceContext.Provider
      value={{
        places,
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
    </PlaceContext.Provider>
  );
};

export { PlaceContext, PlaceProvider };
