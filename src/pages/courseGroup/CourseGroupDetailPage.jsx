import MyPageSidebar from '../../components/common/MyPageSidebar';
import CourseGroupDetail from '../../components/courseGroup/CourseGroupDetail';
import styles from '../../styles/CourseGroupTapBar.module.css';

const CourseGroupDetailPage = () => {
  return (
    <div className="grid-container">
      <MyPageSidebar />
      <div className={styles['cg-contents-container']}>
        <CourseGroupDetail />
      </div>
    </div>
  );
};

export default CourseGroupDetailPage;
