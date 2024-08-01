import React from 'react';
import { useParams } from 'react-router-dom';

const MyCourseEditPage = () => {
  const { courseSeq } = useParams();

  return (
    <div>
      <h1>수정 페이지</h1>
      <p>CourseSeq: {courseSeq}</p>
      {/* 여기에 코스 수정 폼을 추가하세요 */}
    </div>
  );
};

export default MyCourseEditPage;
