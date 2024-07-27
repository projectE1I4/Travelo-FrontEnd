import React, { useState } from 'react';
import { useCourse } from '../../contexts/CourseContext';
import CourseMiniCard from './CourseMiniCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/components/courseCustom/CourseSidebar.module.css';

const CourseSidebar = () => {
  const { selectedRegion, regions, courses, updateFilters, resetFilters } =
    useCourse();
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
    resetFilters({ area: selectedRegion }); // 필터 초기화 시 지역 필터 유지
  };

  const filteredCourses = selectedType
    ? courses.filter((course) => course.type === selectedType)
    : courses;

  return (
    <div className={styles.sidebar}>
      <div className={styles.heading}>
        <h2>선택 지역: {regionName}</h2>
        <button onClick={handleReset} className={styles.resetButton}>
          <FontAwesomeIcon icon={faRotateRight} />
          초기화
        </button>
      </div>
      <div className={styles.searchField}>
        <input
          type="text"
          placeholder="키워드를 입력해주세요"
          className={styles.searchInput}
          value={keyword}
          onChange={handleKeywordInputChange}
        />
        <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
      </div>
      <div className={styles.filters}>
        <button
          onClick={() => handleTypeClick('')}
          className={styles.filterButton}
        >
          전체
        </button>
        <button
          onClick={() => handleTypeClick('12')}
          className={styles.filterButton}
        >
          관광지
        </button>
        <button
          onClick={() => handleTypeClick('14')}
          className={styles.filterButton}
        >
          문화시설
        </button>
        <button
          onClick={() => handleTypeClick('28')}
          className={styles.filterButton}
        >
          레저 스포츠
        </button>
        <button
          onClick={() => handleTypeClick('32')}
          className={styles.filterButton}
        >
          숙박
        </button>
        <button
          onClick={() => handleTypeClick('38')}
          className={styles.filterButton}
        >
          쇼핑
        </button>
        <button
          onClick={() => handleTypeClick('39')}
          className={styles.filterButton}
        >
          음식점
        </button>
      </div>
      <div className={styles.miniCardContainer}>
        {filteredCourses.map((course) => (
          <CourseMiniCard key={course.placeSeq} place={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;
