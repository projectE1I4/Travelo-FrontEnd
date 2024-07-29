import MyPageSidebar from '../../components/common/MyPageSidebar';
import CourseGroupModify from '../../components/courseGroup/CourseGroupModify';
import styles from '../../styles/CourseGroupTapBar.module.css';

const CourseGroupModifyPage = () => {
  return (
    <div className="grid-container">
      <MyPageSidebar />
      <div className={styles['cg-contents-container']}>
        <CourseGroupModify />
      </div>
    </div>
  );
};

export default CourseGroupModifyPage;
