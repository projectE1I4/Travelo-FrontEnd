// ModifyCourseGroupCard.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap, faPlus } from '@fortawesome/free-solid-svg-icons';
import ModifyCourseCard from './ModifyCourseCard';
import styles from '../../styles/pages/courseGroup/CourseGroupCard.module.css';

const ModifyCourseGroupCard = ({ index, courseSeq, courses }) => {
  const course = courses[index]; // courses 배열에서 해당 인덱스의 코스를 가져옴

  return (
    <div className={styles['course-card']}>
      <div className={styles['card-number']}>{index + 1}</div>
      <div className={styles['card-content']}>
        {course ? (
          <ModifyCourseCard course={course} />
        ) : (
          <div className={styles['unfilled']}>
            <FontAwesomeIcon
              icon={faMap}
              className={styles['unfilled-icon1']}
            />
            <FontAwesomeIcon
              icon={faPlus}
              className={styles['unfilled-icon2']}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ModifyCourseGroupCard;
