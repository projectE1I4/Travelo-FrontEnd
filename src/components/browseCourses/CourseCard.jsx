import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/components/browseCourses/CourseCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faBookmark,
  faImage,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { BrowseContext } from '../../contexts/BrowseContext';
import {
  addCourseBookmark,
  removeCourseBookmark,
} from '../../services/bookmarkService';
import { likeCourse } from '../../services/likeService';

const CourseCard = ({
  courseSeq,
  title,
  description,
  viewCount,
  likeCount,
  createDate,
  areaCode,
  images = [],
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likeCount);
  const [liked, setLiked] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [loadingBookmark, setLoadingBookmark] = useState(false);
  const navigate = useNavigate();
  const { courseBookmarks, fetchUserBookmarks, updateCourseLikes } =
    useContext(BrowseContext);

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      fetchUserBookmarks(accessToken);
    }
  }, [fetchUserBookmarks]);

  useEffect(() => {
    const isBookmarked = courseBookmarks.some(
      (bookmark) => bookmark.course.courseSeq === courseSeq
    );
    setIsBookmarked(isBookmarked);
  }, [courseBookmarks, courseSeq]);

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const accessToken = sessionStorage.getItem('accessToken');

    if (!accessToken) {
      navigate('/users/login');
      return;
    }

    try {
      const updatedLikeYn = await likeCourse(courseSeq, accessToken);

      if (updatedLikeYn === 'Y') {
        setCurrentLikes((prevLikes) => prevLikes + 1);
        setLiked(true);
        updateCourseLikes(courseSeq, true);
      } else if (updatedLikeYn === 'N') {
        setCurrentLikes((prevLikes) => prevLikes - 1);
        setLiked(false);
        updateCourseLikes(courseSeq, false);
      }

      setAnimate(true);
      setTimeout(() => setAnimate(false), 200);
    } catch (error) {
      console.error('Error updating like status: ', error);
    }
  };

  const handleBookmark = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const accessToken = sessionStorage.getItem('accessToken');

    if (!accessToken) {
      navigate('/users/login');
      return;
    }

    setLoadingBookmark(true);

    try {
      if (isBookmarked) {
        const bookmark = courseBookmarks.find(
          (bookmark) => bookmark.course.courseSeq === courseSeq
        );
        if (bookmark) {
          await removeCourseBookmark(bookmark.courseBookmarkSeq, accessToken);
          setIsBookmarked(false);
        }
      } else {
        await addCourseBookmark(courseSeq, accessToken);
        setIsBookmarked(true);
      }
      fetchUserBookmarks(accessToken);
    } catch (error) {
      console.error('Error updating bookmark status:', error);
    } finally {
      setLoadingBookmark(false);
    }
  };

  return (
    <Link
      to={`/course/${courseSeq}`}
      className={styles.card}
      state={{
        courseSeq,
        title,
        description,
        viewCount,
        likeCount,
        createDate,
        areaCode,
        images,
      }}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className={styles['image-container']}>
        {images.length > 0 ? (
          <div className={styles['image-grid']}>
            {images.map((src, index) => (
              <div key={index} className={styles['image-item']}>
                {src ? (
                  <img
                    src={src}
                    alt={`course-img-${index}`}
                    className={styles.image}
                  />
                ) : (
                  <div className={styles['image-placeholder']}>
                    <FontAwesomeIcon icon={faImage} size="1x" color="#ccc" />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className={styles['image-placeholder']}>
            <FontAwesomeIcon icon={faImage} size="3x" color="#ccc" />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div>
          <div className={styles.details}>
            <h3>{title}</h3>
            <p>{description}</p>
            {/* <p>{courseSeq}</p> */}
          </div>
        </div>
        <div className={styles.icons}>
          <div className={styles.wrap}>
            <span>
              <FontAwesomeIcon icon={faEye} /> {viewCount}
            </span>
            <span
              onClick={handleLike}
              className={`${styles['heart-icon']} ${
                animate ? styles.active : styles.inactive
              }`}
              style={{ cursor: 'pointer' }}
            >
              <FontAwesomeIcon
                icon={faHeart}
                className={styles['heart-icon']}
              />{' '}
              {currentLikes}
            </span>
            <span
              onClick={handleBookmark}
              className={`${styles['bookmark-icon']} ${
                isBookmarked ? styles.active : ''
              } ${loadingBookmark ? styles.loading : ''}`}
              style={{ cursor: 'pointer' }}
            >
              <FontAwesomeIcon icon={faBookmark} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
