import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/components/courseCustom/CourseMiniCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useCourse } from '../../contexts/CourseContext';

const CourseMiniCard = ({ place }) => {
  const navigate = useNavigate();
  const { addPlaceToCourse, selectedRegion } = useCourse();

  const handleCardClick = () => {
    sessionStorage.setItem('selectedRegion', selectedRegion);
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

  const handleAddClick = (e) => {
    e.stopPropagation();
    addPlaceToCourse(place);
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      {place.imageFile1 ? (
        <img
          src={place.imageFile1}
          alt={place.title}
          className={styles.image}
        />
      ) : (
        <div className={styles.noImage}>이미지 없음</div>
      )}
      <div className={styles.details}>
        <h4 className={styles.name}>{place.title}</h4>
        <p className={styles.address}>{place.address}</p>
        <div className={styles.footer}>
          <span className={styles.likes}>
            <FontAwesomeIcon icon={faHeart} /> {place.likeCount}
          </span>
          <button className={styles.addButton} onClick={handleAddClick}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseMiniCard;
