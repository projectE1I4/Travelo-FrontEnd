import React, { useState } from 'react';
import { useCourse } from '../../contexts/CourseContext';
import CourseCard from './CourseCard';
import CourseSaveModal from './CourseSaveModal'; // CourseSaveModal을 import 합니다.
import styles from '../../styles/components/courseCustom/CourseContent.module.css';

const CourseContent = () => {
  const { selectedPlaces, resetSelectedPlaces } = useCourse();
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false); // 모달 상태 추가

  const handleSaveButtonClick = () => {
    setIsSaveModalOpen(true);
    document.body.style.overflow = 'hidden'; // 모달이 열리면 스크롤 막기
  };

  const handleCloseSaveModal = () => {
    setIsSaveModalOpen(false);
    document.body.style.overflow = 'auto'; // 모달이 닫히면 스크롤 허용
  };

  const isSaveButtonEnabled = selectedPlaces.length >= 4;

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
      <button
        onClick={handleSaveButtonClick}
        disabled={!isSaveButtonEnabled}
        className={`${styles['save-button']} ${
          isSaveButtonEnabled ? styles['enabled'] : styles['disabled']
        }`}
      >
        저장버튼
      </button>

      {isSaveModalOpen && <CourseSaveModal onClose={handleCloseSaveModal} />}
    </div>
  );
};

export default CourseContent;
