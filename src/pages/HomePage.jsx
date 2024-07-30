import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // CSS 파일 경로 수정
import styles from '../styles/HomePage.module.css';
import axiosInstance from '../utils/axiosInstance'; // axiosInstance import
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [data, setData] = useState({
    courses: [],
    places: [],
    areaCodes: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/travelo/main');
        console.log(response.data);
        setData({
          courses: response.data.courses,
          places: response.data.places,
          areaCodes: response.data.areaCodes,
        });
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  const handlePlaceClick = (place) => {
    navigate(`/places/${place.placeSeq}`, {
      state: {
        type: place.type,
        contentId: place.contentId,
        image: place.imageFile1,
        title: place.title,
        address: place.address,
        views: place.viewCount,
        likes: place.likeCount,
        bookmarks: place.bookmarks || 0,
        latitude: place.latitude,
        longitude: place.longitude,
      },
    });
  };

  return (
    <div className={styles['grid-container']}>
      <main className={styles.wrap}>
        {/* 메인 비주얼 슬라이드 */}
        <Swiper spaceBetween={50} slidesPerView={1} className={styles.swiper}>
          <SwiperSlide>
            <div className={styles.slideContent}>
              <h3>Main Visual 1</h3>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.slideContent}>
              <h3>Main Visual 2</h3>
            </div>
          </SwiperSlide>
        </Swiper>

        {/* 추천 지역 */}
        <h2>추천 지역</h2>
        <div className={styles.gridContainer}>
          {data.areaCodes.slice(0, 6).map((area, index) => (
            <div key={index} className={styles.gridItem}>
              <h3>{area.areaName}</h3>
            </div>
          ))}
        </div>

        {/* 인기 장소 */}
        <h2>인기 장소</h2>
        <Swiper spaceBetween={10} slidesPerView={3} className={styles.swiper}>
          {data.places.slice(0, 6).map((place, index) => (
            <SwiperSlide key={index} onClick={() => handlePlaceClick(place)}>
              <div className={styles.slideContent}>
                <img src={place.imageFile1} alt={place.title} />
                <h3>{place.title}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 인기 코스 */}
        <h2>인기 코스</h2>
        <Swiper spaceBetween={10} slidesPerView={3} className={styles.swiper}>
          {data.courses.slice(0, 6).map((course, index) => (
            <SwiperSlide key={index}>
              <div className={styles.slideContent}>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </main>
    </div>
  );
};

export default HomePage;
