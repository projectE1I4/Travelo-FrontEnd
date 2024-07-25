import React from 'react';
import { useParams } from 'react-router-dom';

const CourseEdit = () => {
  const { courseSeq } = useParams();

  return (
    <div>
      <h1>코스 수정하기</h1>
      <p>코스 ID: {courseSeq}</p>
      {/* 여기에서 코스 상세 정보를 가져와서 보여줄 수 있습니다 */}
    </div>
  );
};

export default CourseEdit;
