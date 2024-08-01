import MyPlaceBookmark from '../../components/bookmark/MyPlaceBookmark';
import BookmarkTapBar from '../../components/common/BookmarkTapBar';
import CourseGroupTapBar from '../../components/common/CourseGroupTapBar';
import MyPageSidebar from '../../components/common/MyPageSidebar';
import CourseGroupList from '../../components/courseGroup/CourseGroupList';
import styles from '../../styles/CourseGroupTapBar.module.css';

const MyPlaceBookmarkPage = () => {
  return (
    <div className="grid-container">
      <MyPageSidebar />
      <div className={styles['cg-contents-container']}>
        <BookmarkTapBar />
        <MyPlaceBookmark />
      </div>
    </div>
  );
};
export default MyPlaceBookmarkPage;
