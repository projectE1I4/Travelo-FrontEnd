import React, { useState } from 'react';
import { useCourse } from '../../contexts/CourseContext';
import CourseMiniCard from './CourseMiniCard';
import CourseMap from './CourseMap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/components/courseCustom/CourseSidebar.module.css';

const CourseSidebar = () => {
  const {
    selectedRegion,
    regions,
    courses,
    updateFilters,
    resetFilters,
    currentPage,
    setCurrentPage,
    totalPages,
    loading,
    resetSelectedRegion,
  } = useCourse();
  const [selectedType, setSelectedType] = useState('');
  const [keyword, setKeyword] = useState('');

  const regionName =
    regions.find((region) => region.code === selectedRegion)?.name || '전체';

  const handleTypeClick = (type) => {
    setSelectedType(type);
    updateFilters({ content: type });
  };

  const handleKeywordInputChange = (e) => {
    setKeyword(e.target.value);
    updateFilters({ keyword: e.target.value });
  };

  const handleReset = () => {
    setSelectedType('');
    setKeyword('');
    resetFilters({ area: selectedRegion });
  };

  const loadMore = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const filteredCourses = selectedType
    ? courses.filter((course) => course.type === selectedType)
    : courses;

  return (
    <div className={styles.sidebar}>
      <div className={styles.button}>
        <button
          onClick={resetSelectedRegion}
          className={styles['reset-button-region']}
        >
          지역 다시 선택하기
        </button>
      </div>
      <div className={styles['map-container']}>
        <CourseMap />
      </div>
      <div className={styles.heading}>
        <h3>
          선택 지역 ·{' '}
          <span className={styles['region-name']}>{regionName}</span>
        </h3>
        <button onClick={handleReset} className={styles['reset-button']}>
          <FontAwesomeIcon icon={faRotateRight} />
          초기화
        </button>
      </div>
      <div className={styles['search-field']}>
        <input
          type="text"
          placeholder="키워드를 입력해주세요"
          className={styles['search-input']}
          value={keyword}
          onChange={handleKeywordInputChange}
        />
        <FontAwesomeIcon icon={faSearch} className={styles['search-icon']} />
      </div>
      <div className={styles['type-filter-container']}>
        <div className={styles['type-filter']}>
          <button
            onClick={() => handleTypeClick('')}
            className={selectedType === '' ? styles.selected : ''}
          >
            전체
          </button>
          <button
            onClick={() => handleTypeClick('12')}
            className={selectedType === '12' ? styles.selected : ''}
          >
            관광지
          </button>
          <button
            onClick={() => handleTypeClick('14')}
            className={selectedType === '14' ? styles.selected : ''}
          >
            문화시설
          </button>
          <button
            onClick={() => handleTypeClick('28')}
            className={selectedType === '28' ? styles.selected : ''}
          >
            레저 스포츠
          </button>
          <button
            onClick={() => handleTypeClick('32')}
            className={selectedType === '32' ? styles.selected : ''}
          >
            숙박
          </button>
          <button
            onClick={() => handleTypeClick('38')}
            className={selectedType === '38' ? styles.selected : ''}
          >
            쇼핑
          </button>
          <button
            onClick={() => handleTypeClick('39')}
            className={selectedType === '39' ? styles.selected : ''}
          >
            음식점
          </button>
        </div>
      </div>
      <div className={styles['mini-card-container']}>
        {filteredCourses.map((course, index) => (
          <CourseMiniCard key={`${course.placeSeq}-${index}`} place={course} />
        ))}
      </div>
      {currentPage < totalPages - 1 && (
        <button
          onClick={loadMore}
          className={styles['load-more-button']}
          disabled={loading}
        >
          더보기
        </button>
      )}
    </div>
  );
};

export default CourseSidebar;
