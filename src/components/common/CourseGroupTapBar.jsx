import { Link, useLocation } from 'react-router-dom';
import styles from '../../styles/CourseGroupTapBar.module.css';

const CourseGroupTapBar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? styles.CGactive : '';
  };

  return (
    <div className={styles['tapbar-container']}>
      <ul className={styles['tap-wrap']}>
        <Link to="/mypage/myCourses">
          <li className={isActive('/mypage/myCourses')}>커스텀 코스</li>
        </Link>
        <Link to="/mypage/courseGroup">
          <li className={isActive('/mypage/courseGroup')}>그룹</li>
        </Link>
      </ul>
    </div>
  );
};

export default CourseGroupTapBar;
