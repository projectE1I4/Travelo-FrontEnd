import { useContext, useEffect, useState } from 'react';
import { CourseGroupContext } from '../../contexts/CourseGroupContext';
import styles from '../../styles/pages/CourseGroup/CourseGroupList.module.css';

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

  return (
    <div className={styles['group-box']}>
      <div>
        {courseGroups.map((group) => (
          <div key={group.courseGroupSeq}>
            <div>
              <h3>{group.title}</h3>
              <p>{group.createDate}</p>
            </div>
            <ul>
              {group.courseGroupList.map((courseGroupList) => (
                <li key={courseGroupList.courseGroupListSeq}>
                  <h4>{courseGroupList.course.title}</h4>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseGroupList;
