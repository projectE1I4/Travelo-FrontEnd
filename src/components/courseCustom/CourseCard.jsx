import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/components/courseCustom/CourseCard.module.css';
import { useCourse } from '../../contexts/CourseContext';

const CourseCard = ({ place }) => {
  const { removePlaceFromCourse, setMapCenter } = useCourse();

  const handleRemove = () => {
    removePlaceFromCourse(place.placeSeq);
  };

  const handleCardClick = () => {
    setMapCenter({ lat: place.latitude, lng: place.longitude });
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <h3>{place.title}</h3>
      <p>{place.address}</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleRemove();
        }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

export default CourseCard;
