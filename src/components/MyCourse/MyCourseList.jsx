import React, { useEffect, useState } from 'react';
import { myCourses, deleteCourse } from '../../services/MyCourseService';
import { useNavigate } from 'react-router-dom'; // 여기서 한 번만 import
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri';
import '../../css/myCourseList.css';

const MyCourseList = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  // 코스 삭제
  const deleteBtn = async (courseSeq) => {
    const confirmDelete = window.confirm('정말 코스를 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        const response = await deleteCourse(courseSeq);
        alert(response.message); // 성공 메시지 출력
        setCourses(courses.filter((course) => course.courseSeq !== courseSeq));
      } catch (err) {
        setError(err);
      }
    }
  };

  // 코스 수정 페이지로 이동
  const editBtn = (courseSeq) => {
    navigate(`/courseEdit/${courseSeq}`);
  };

  // 날짜 형식 변경 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  // 제목 말줄임 처리 함수
  const titleLength = (title, maxLength = 12) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + '...';
    }
    return title;
  };

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
                    {course.courseList.slice(0, 4).map(
                      (
                        item,
                        index // 최대 4개의 이미지까지만 표시
                      ) => (
                        <li
                          key={item.courseListSeq}
                          className={`image-item image-item-${index + 1}`}
                        >
                          <img
                            src={item.place.imageFile1}
                            alt={item.place.title}
                          />
                        </li>
                      )
                    )}
                  </ul>
                  <p className="courseTitle" title={course.title}>
                    {titleLength(course.title)}
                  </p>
                  <p className="courseDate">{formatDate(course.createDate)}</p>
                  <button
                    className="editBtn"
                    onClick={() => editBtn(course.courseSeq)}
                  >
                    <RiEdit2Line />
                  </button>
                  <button
                    className="deleteBtn"
                    onClick={() => deleteBtn(course.courseSeq)}
                  >
                    <RiDeleteBin6Line />
                  </button>
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
