import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/components/browseCourses/CourseCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faImage } from '@fortawesome/free-solid-svg-icons';
import { BrowseContext } from '../../contexts/BrowseContext';

const CourseCard = ({
  courseSeq,
  image,
  title,
  description,
  viewCount,
  likeCount,
  bookmarks,
  contentId,
  longitude,
  latitude,
}) => {
  const [currentLikes, setCurrentLikes] = useState(likeCount);
  const [animate, setAnimate] = useState(false);

  return (
    <Link
      to={`/courses/${courseSeq}`}
      className={styles.card}
      state={{
        courseSeq,
        contentId,
        image,
        title,
        description,
        viewCount,
        likeCount,
        bookmarks,
        longitude,
        latitude,
      }}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className={styles['image-container']}>
        {image ? (
          <img src={image} alt={title} className={styles.image} />
        ) : (
          <div className={styles['image-placeholder']}>
            <FontAwesomeIcon icon={faImage} size="6x" color="#ccc" />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div>
          <div className={styles.details}>
            <h3>{title}</h3>
            <p>{description}</p>
            <p>{courseSeq}</p>
          </div>
        </div>
        <div className={styles.icons}>
          <div className={styles.wrap}>
            <span>
              <FontAwesomeIcon icon={faEye} /> {viewCount}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
