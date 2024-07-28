import { useContext, useEffect, useState } from 'react';
import { CourseGroupContext } from '../../contexts/CourseGroupContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../../styles/pages/CourseGroup/CourseGroupList.module.css';
import {
  faMapLocationDot,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import Pagination from '../common/Pagination';
import GroupPagination from '../common/GroupPagination';

const CourseGroupList = () => {
  const { courseGroups, loading, error } = useContext(CourseGroupContext);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!courseGroups || courseGroups.length === 0) {
    return <p>No course groups found.</p>;
  }

  const formatDate = (dateString) => {
    // 날짜 문자열을 Date 객체로 변환
    const date = new Date(dateString);

    // 연도, 월, 일 추출
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더함
    const day = String(date.getDate()).padStart(2, '0');

    // 원하는 형식으로 조합
    return `${year}.${month}.${day}`;
  };

  return (
    <div className={styles['group-box']}>
      <div className={styles['group-btn-wrap']}>
        <button type="button" className={styles['group-btn']}>
          그룹 생성
        </button>
        <button type="button" className={styles['group-btn']}>
          선택 삭제
        </button>
      </div>
      <div className={styles['group-content-box']}>
        {courseGroups.map((group) => (
          <div key={group.courseGroupSeq} className={styles['group-card']}>
            <div className={styles['group-date-wrap']}>
              <p>{formatDate(group.createDate)}</p>
            </div>
            <div className={styles['group-title-wrap']}>
              <FontAwesomeIcon
                icon={faMapLocationDot}
                className={styles['group-title-icon']}
              />
              <h3>{group.title}</h3>
            </div>
            <ul className={styles['group-course-title-wrap']}>
              {group.courseGroupList.map((courseGroupList) => (
                <li key={courseGroupList.courseGroupListSeq}>
                  <h4>{courseGroupList.course.title}</h4>
                </li>
              ))}
            </ul>
            <div className={styles['group-delete-wrap']}>
              <FontAwesomeIcon icon={faTrashCan} />
            </div>
          </div>
        ))}
      </div>
      <GroupPagination />
    </div>
  );
};

export default CourseGroupList;
