import MyPageSidebar from '../../components/common/MyPageSidebar';
import CourseGroupCreate from '../../components/courseGroup/CourseGroupCreate';
import styles from '../../styles/CourseGroupTapBar.module.css';

const CourseGroupCreatePage = () => {
  return (
    <div className="grid-container">
      <MyPageSidebar />
      <div className={styles['cg-contents-container']}>
        <CourseGroupCreate />
      </div>
    </div>
  );
};

export default CourseGroupCreatePage;
