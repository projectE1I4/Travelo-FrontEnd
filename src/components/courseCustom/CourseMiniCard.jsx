import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/components/courseCustom/CourseMiniCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const CourseMiniCard = ({ place }) => {
  return (
    <Link
      to={`/places/${place.placeSeq}`}
      state={{
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
      }}
      className={styles.card}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
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
          <button
            className={styles.addButton}
            onClick={(e) => {
              e.stopPropagation();
              alert('추가 기능을 구현하세요');
            }}
          >
            +
          </button>
        </div>
      </div>
    </Link>
  );
};

export default CourseMiniCard;
