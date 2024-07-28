import React from 'react';
import { useCourse } from '../../contexts/CourseContext';
import CourseCard from './CourseCard';
import styles from '../../styles/components/courseCustom/CourseContent.module.css';

const CourseContent = () => {
  const { selectedPlaces } = useCourse();

  return (
    <div className={styles['course-content']}>
      <h2>선택된 장소</h2>
      <div>
        {selectedPlaces.length === 0 ? (
          <p>장소를 선택해주세요.</p>
        ) : (
          selectedPlaces.map((place) => (
            <CourseCard key={place.placeSeq} place={place} />
          ))
        )}
      </div>
    </div>
  );
};

export default CourseContent;
