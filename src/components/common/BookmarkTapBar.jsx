import { Link, useLocation } from 'react-router-dom';
import styles from '../../styles/CourseGroupTapBar.module.css';

const BookmarkTapBar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? styles.CGactive : '';
  };

  return (
    <div className={styles['tapbar-container']}>
      <ul className={styles['tap-wrap']}>
        <Link to="/mypage/placeBookmark">
          <li className={isActive('/mypage/placeBookmark')}>장소 북마크</li>
        </Link>
        <Link to="/mypage/courseBookmark">
          <li className={isActive('/mypage/courseBookmark')}>코스 북마크</li>
        </Link>
      </ul>
    </div>
  );
};

export default BookmarkTapBar;
