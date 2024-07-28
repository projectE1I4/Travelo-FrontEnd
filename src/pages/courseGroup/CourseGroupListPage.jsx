import CourseGroupTapBar from '../../components/common/CourseGroupTapBar';
import MyPageSidebar from '../../components/common/MyPageSidebar';
import CourseGroupList from '../../components/courseGroup/CourseGroupList';
import styles from '../../styles/CourseGroupTapBar.module.css';

const CourseGroupListPage = () => {
  return (
    <div className="grid-container">
      <MyPageSidebar />
      <div className={styles['cg-contents-container']}>
        <CourseGroupTapBar />
        <CourseGroupList />
      </div>
    </div>
  );
};
export default CourseGroupListPage;
