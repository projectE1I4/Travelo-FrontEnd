import React from 'react';
import { useCourse } from '../../contexts/CourseContext';
import styles from '../../styles/components/courseCustom/RegionSelectModal.module.css';

const RegionSelectModal = ({ onSelect }) => {
  const { regions } = useCourse();

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>여행지역 선택</h2>
        <div className={styles.regions}>
          {regions.map((region) => (
            <button
              key={region.code}
              onClick={() => onSelect(region.code)}
              className={styles.regionButton}
            >
              {region.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegionSelectModal;
