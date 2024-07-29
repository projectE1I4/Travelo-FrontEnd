import React, { useEffect, useState } from 'react';
import {
  getCourseList,
  getVisibleCourseList,
  deleteCourse,
  deleteCourses,
} from '../../services/adminService';
import { formatDate } from '../common/formatDate';
import '../../css/Admin/AdminCourse.css';

const AdminCourseList = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState('latest');
  const [filter, setFilter] = useState('all');
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let data;
        if (filter === 'all') {
          data = await getCourseList(page, sortBy);
        } else {
          data = await getVisibleCourseList(page, sortBy, filter);
        }
        setCourses(data.content);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(err);
      }
    };
    fetchCourses();
  }, [page, sortBy, filter]);

  const deleteCourseBtn = async (courseSeq) => {
    if (window.confirm('정말로 이 코스를 삭제하시겠습니까?')) {
      try {
        console.log('dddddddddddddddddd');
        await deleteCourse(courseSeq);
        console.log('여기도 안들어오니?', courseSeq);
        setCourses(courses.filter((course) => course.courseSeq !== courseSeq));
        alert('코스가 성공적으로 삭제되었습니다.');
      } catch (err) {
        console.error('Error deleting course:', err);
        setError(err);
        alert('코스 삭제에 실패했습니다.');
      }
    }
  };

  const deleteSelectedCourses = async () => {
    if (selectedCourses.length === 0) {
      alert('삭제할 코스를 선택하세요.');
      return;
    }
    if (window.confirm('선택한 코스를 삭제하시겠습니까?')) {
      try {
        await deleteCourses(selectedCourses);
        setCourses(
          courses.filter(
            (course) => !selectedCourses.includes(course.courseSeq)
          )
        );
        setSelectedCourses([]);
        alert('선택한 코스가 성공적으로 삭제되었습니다.');
      } catch (err) {
        setError(err);
        alert('선택한 코스 삭제에 실패했습니다.');
      }
    }
  };

  const toggleSelectCourse = (courseSeq) => {
    setSelectedCourses((prevSelected) =>
      prevSelected.includes(courseSeq)
        ? prevSelected.filter((seq) => seq !== courseSeq)
        : [...prevSelected, courseSeq]
    );
  };

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="adminCourseList">
      <h1>전체 코스 목록</h1>
      <div className="filters">
        <button onClick={() => setFilter('all')}>전체 보기</button>
        <button onClick={() => setFilter('N')}>공개</button>
        <button onClick={() => setFilter('Y')}>비공개</button>
      </div>
      <div className="sort">
        <button onClick={() => setSortBy('latest')}>최신순</button>
        <button onClick={() => setSortBy('oldest')}>오래된 순</button>
      </div>
      <button onClick={deleteSelectedCourses}>선택한 코스 삭제</button>
      <ul>
        {courses.map((course) => (
          <li key={course.courseSeq}>
            <input
              type="checkbox"
              onChange={() => toggleSelectCourse(course.courseSeq)}
              checked={selectedCourses.includes(course.courseSeq)}
            />
            <h3>{course.title}</h3>
            <p>코스 번호: {course.courseSeq}</p>
            <p>생성 일자: {formatDate(course.createDate)}</p>
            <p>
              수정 일자:{' '}
              {course.modifyDate
                ? formatDate(course.modifyDate)
                : '수정된 적 없음'}
            </p>
            <p>공개 여부: {course.privateYn === 'Y' ? '비공개' : '공개'}</p>
            <button onClick={() => deleteCourseBtn(course.courseSeq)}>
              삭제
            </button>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page <= 0}>
          이전
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages - 1}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default AdminCourseList;
