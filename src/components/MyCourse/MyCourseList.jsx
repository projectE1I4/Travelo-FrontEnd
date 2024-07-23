import React, { useEffect, useState } from 'react';
import { myCourses } from '../../services/MyCourseService';
import '../../css/myCourseList.css';

const MyCourseList = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const data = await myCourses();
        setCourses(data);
      } catch (err) {
        setError(err);
      }
    };

    getCourses();
  }, []);

  if (error)
    return <div>코스를 불러오는 중 오류가 발생했습니다: {error.message}</div>;

  return (
    <div className="container">
      <div className="grid-container">
        <h1>나의 코스</h1>
        <div className="courselist">
          <ul className="courseItem">
            {courses.map((course) => {
              const placeCount = course.courseList.length;
              let placeClass = '';
              if (placeCount === 1) placeClass = 'one';
              else if (placeCount === 2) placeClass = 'two';
              else if (placeCount === 3) placeClass = 'three';
              else if (placeCount >= 4) placeClass = 'four';

              return (
                <div key={course.courseSeq} className={`course ${placeClass}`}>
                  <ul className="image">
                    {course.courseList.map((item, index) => (
                      <li
                        key={item.courseListSeq}
                        className={`image-item image-item-${index + 1}`}
                      >
                        <img
                          src={item.place.imageFile1}
                          alt={item.place.title}
                        />
                      </li>
                    ))}
                  </ul>
                  <p className="courseTitle">{course.title}</p>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyCourseList;
