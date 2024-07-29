import { useContext } from 'react';
import styles from '../../styles/components/browseCourses/ListContent.module.css';
import CourseCard from './CourseCard';
import Pagination from './Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { BrowseContext } from '../../contexts/BrowseContext';

const ListContent = () => {
  const {
    courses,
    loading,
    error,
    dropdownTitle,
    handleDropdownClick,
    totalPages,
  } = useContext(BrowseContext);

  if (loading) return <span className="loader"></span>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles['list-content']}>
      <div className={styles['dropdown-wrap']}>
        <div className={styles['dropdown']}>
          <div className={styles['dropdown-btn']}>
            {dropdownTitle} <FontAwesomeIcon icon={faChevronDown} />
          </div>
          <div className={styles['dropdown-content']}>
            <a onClick={() => handleDropdownClick('인기순')}>인기순</a>
            <a onClick={() => handleDropdownClick('최신순')}>최신순</a>
            <a onClick={() => handleDropdownClick('오래된순')}>오래된순</a>
          </div>
        </div>
      </div>
      <div className={styles['list-content-wrap']}>
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard
              key={course.courseSeq}
              courseSeq={course.courseSeq}
              title={course.title}
              description={course.description}
              viewCount={course.viewCount}
              likeCount={course.likeCount}
              createDate={course.createDate}
              areaCode={course.areaCode}
              image={course.courseList[0]?.place.imageFile1}
            />
          ))
        ) : (
          <p>코스가 없습니다.</p>
        )}
      </div>
      {courses.length > 0 && <Pagination totalPages={totalPages} />}
    </div>
  );
};

export default ListContent;
