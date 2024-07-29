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
        <li className={isActive('/mypage/myCourses')}>
          <Link to="/mypage/myCourses">커스텀 코스</Link>
        </li>
        <li className={isActive('/mypage/courseGroup')}>
          <Link to="/mypage/courseGroup">그룹</Link>
        </li>
      </ul>
    </div>
  );
};

export default CourseGroupTapBar;
