import React, { useState } from 'react';
import { useCourse } from '../../contexts/CourseContext';
import CourseCard from './CourseCard';
import CourseSaveModal from './CourseSaveModal';
import styles from '../../styles/components/courseCustom/CourseContent.module.css';

const CourseContent = () => {
  const { selectedPlaces, resetSelectedPlaces } = useCourse();
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const handleSaveClick = () => {
    setIsSaveModalOpen(true);
  };

  const handleModalClose = () => {
    setIsSaveModalOpen(false);
  };

  return (
    <div className={styles['course-content']}>
      <div className={styles['heading']}>
        <h2>선택된 장소 {selectedPlaces.length}/6</h2>
        <div onClick={resetSelectedPlaces}>장소 설정 초기화</div>
      </div>
      <div className={styles['course-content-wrap']}>
        {selectedPlaces.length === 0 ? (
          <p>장소를 선택해주세요.</p>
        ) : (
          selectedPlaces.map((place) => (
            <CourseCard key={place.placeSeq} place={place} />
          ))
        )}
      </div>
      <div>
        <button
          onClick={handleSaveClick}
          disabled={selectedPlaces.length < 4} // 4개 미만일 때 비활성화
        >
          저장
        </button>
      </div>
      {isSaveModalOpen && <CourseSaveModal onClose={handleModalClose} />}
    </div>
  );
};

export default CourseContent;
