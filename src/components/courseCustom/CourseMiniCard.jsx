import React from 'react';
import styles from '../../styles/components/courseCustom/CourseMiniCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const CourseMiniCard = ({ place }) => {
  return (
    <div className={styles.card}>
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
          <button className={styles.addButton}>+</button>
        </div>
      </div>
    </div>
  );
};

export default CourseMiniCard;
