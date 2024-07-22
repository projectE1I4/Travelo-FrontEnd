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

  // 필터 및 정렬에 따라 장소 데이터를 가져오는 함수
  const fetchPlaces = async (updatedFilters) => {
    setLoading(true); // 데이터를 가져오기 전 로딩 상태로 설정
    try {
      const response = await axiosInstance.get('/travelo/place/list', {
        params: {
          ...filters, // 기존 필터와 정렬 상태
          ...updatedFilters, // 새로운 필터와 정렬 상태
        },
      });
      setPlaces(response.data.paging.content);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false); // 데이터 가져오기 완료 후 로딩 상태 해제
    }
  };

  useEffect(() => {
    fetchPlaces(filters); // 컴포넌트 마운트 시 필터와 정렬 상태로 데이터 가져오기
  }, []);

  const handleDropdownClick = (title) => {
    setDropdownTitle(title);
    fetchPlaces({ sorts: title === '인기순' ? 'popular' : '' });
  };

  const updateFilters = (newFilters) => {
    setFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        ...newFilters,
      };
      fetchPlaces(updatedFilters);
      return updatedFilters;
    });
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
      }}
    >
      {children}
    </PlaceContext.Provider>
  );
};

export { PlaceContext, PlaceProvider };
