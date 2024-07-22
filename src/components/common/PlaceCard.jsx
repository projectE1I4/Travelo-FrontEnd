import styles from '../../styles/PlaceCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faHeart,
  faBookmark,
  faImage,
} from '@fortawesome/free-solid-svg-icons';

const typeMap = {
  12: '관광지',
  14: '문화시설',
  28: '레저 스포츠',
  32: '숙박',
  38: '쇼핑',
  39: '음식점',
};

const PlaceCard = ({
  image,
  type,
  title,
  address,
  views,
  likes,
  bookmarks,
}) => {
  const typeText = typeMap[type] || '기타';

  return (
    <div className={styles.card}>
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
            <span>
              <FontAwesomeIcon icon={faHeart} /> {likes}
            </span>
            <span>
              <FontAwesomeIcon icon={faBookmark} /> {bookmarks}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
