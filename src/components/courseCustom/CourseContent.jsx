import styles from '../../styles/components/courseCustom/CourseContent.module.css';
import CourseCard from './CourseCard';

const CourseContent = () => {
  return (
    <div className={styles['list-content']}>
      <div className={styles['heading']}>
        <div>
          <span>선택된 장소</span>
          <span>0/6</span>
        </div>
        <div>여기 초기화버튼</div>
      </div>
      <div className={styles['list-content-wrap']}>
        <CourseCard />
      </div>
    </div>
  );
};

export default CourseContent;
