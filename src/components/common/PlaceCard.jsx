import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/components/place/PlaceCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faHeart,
  faBookmark,
  faImage,
} from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../../utils/axiosInstance';
import { useAuth } from '../../hooks/useAuth';

const typeMap = {
  12: '관광지',
  14: '문화시설',
  28: '레저 스포츠',
  32: '숙박',
  38: '쇼핑',
  39: '음식점',
};

const PlaceCard = ({
  placeSeq,
  image,
  type,
  title,
  address,
  views,
  likes,
  bookmarks,
  contentId,
  longitude,
  latitude,
}) => {
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [liked, setLiked] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleLike = async (e) => {
    e.preventDefault(); // Link 동작을 방지하기 위해 기본 동작을 막음
    if (!isAuthenticated) {
      window.location.href = '/users/login';
      return;
    }

    try {
      if (liked) {
        await axiosInstance.post(`/user/place/${placeSeq}/removelike`);
        setCurrentLikes((prevLikes) => prevLikes - 1);
        setLiked(false);
      } else {
        await axiosInstance.post(`/user/place/${placeSeq}/like`);
        setCurrentLikes((prevLikes) => prevLikes + 1);
        setLiked(true);
      }
    } catch (error) {
      console.error('Error updating like status: ', error);
    }
  };

  const typeText = typeMap[type] || '기타';

  return (
    <Link
      to={`/places/${placeSeq}`}
      className={styles.card}
      state={{
        placeSeq,
        type,
        contentId,
        image,
        title,
        address,
        views,
        likes,
        bookmarks,
        typeText,
        typeMap,
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
          <div className={styles.tag}>{typeText}</div>
          <div className={styles.details}>
            <h3>{title}</h3>
            <p>{address}</p>
          </div>
        </div>
        <div className={styles.icons}>
          <div className={styles.wrap}>
            <span>
              <FontAwesomeIcon icon={faEye} /> {views}
            </span>
            <span
              onClick={handleLike}
              style={{ cursor: 'pointer', color: liked ? 'red' : 'inherit' }}
            >
              <FontAwesomeIcon icon={faHeart} /> {currentLikes}
            </span>
            <span>
              <FontAwesomeIcon icon={faBookmark} /> {bookmarks}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCard;
