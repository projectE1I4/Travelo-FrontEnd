import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faImage } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/components/courseCustom/CourseCard.module.css';
import { useCourse } from '../../contexts/CourseContext';

const CourseCard = ({ place }) => {
  const { removePlaceFromCourse, setMapCenter, addPlaceToCourse } = useCourse();

  const handleRemove = () => {
    removePlaceFromCourse(place.placeSeq);
  };

  const handleCardClick = () => {
    setMapCenter({ lat: place.latitude, lng: place.longitude });
  };

  const handleAddClick = (e) => {
    e.stopPropagation();
    addPlaceToCourse(place);
  };

  const typeMap = {
    12: '관광지',
    14: '문화시설',
    28: '레저 스포츠',
    32: '숙박',
    38: '쇼핑',
    39: '음식점',
  };

  const typeText = typeMap[place.type] || '기타';
  return (
    <div className={styles.card} onClick={handleCardClick}>
      <div className={styles['image-container']}>
        {place.imageFile1 ? (
          <img
            src={place.imageFile1}
            alt={place.title}
            className={styles.image}
          />
        ) : (
          <div className={styles['image-placeholder']}>
            <FontAwesomeIcon icon={faImage} size="4x" color="#ccc" />
          </div>
        )}
      </div>
      <div className={styles.details}>
        <div className={styles.tag}>{typeText}</div>
        <div className={styles.content}>
          <h3 className={styles.name}>{place.title}</h3>
          <p className={styles.address}>{place.address}</p>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleRemove();
        }}
        className={styles.deleteButton}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

export default CourseCard;
