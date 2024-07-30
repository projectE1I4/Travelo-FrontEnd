import React from 'react';
import { useCourse } from '../../contexts/CourseContext';
import styles from '../../styles/components/courseCustom/RegionSelectModal.module.css';

const RegionSelectModal = ({ onSelect }) => {
  const { regions } = useCourse();

  return (
    <div className={styles.modal}>
      <div className={styles['modal-content']}>
        <h2>여행지역 선택</h2>
        <div className={styles['region-group']}>
          <h3>서울특별시 / 광역시 / 특별자치시</h3>
          <div className={styles.regions}>
            {regions
              .filter((region) => parseInt(region.code) < 10)
              .map((region) => (
                <button
                  key={region.code}
                  onClick={() => onSelect(region.code)}
                  className={styles['region-button']}
                >
                  {region.name}
                </button>
              ))}
          </div>
        </div>
        <div className={styles['region-group']}>
          <h3>특별자치도, 도</h3>
          <div className={styles.regions}>
            {regions
              .filter((region) => parseInt(region.code) >= 10)
              .map((region) => (
                <button
                  key={region.code}
                  onClick={() => onSelect(region.code)}
                  className={styles['region-button']}
                >
                  {region.name}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionSelectModal;
