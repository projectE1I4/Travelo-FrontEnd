import React, { useState } from 'react';

const MyPageSidebar = () => {
  const [userEdit, setUserEdit] = useState('false');
  const [bookMark, setBookMark] = useState('false');
  const [placeBookMark, setPlaceBookMark] = useState('false');
  const [courseBookMark, setCourseBookMark] = useState('false');
  const [myCourse, setMyCourse] = useState('false');
  const [myReview, setMyReview] = useState('false');

  const handleSidebar = () => {
    // url 따라서 active 주기
  };

  return (
    <div>
      <ul>
        <li onClick={() => {}}>
          <p>회원 정보 수정</p>
        </li>
        <li>
          <ul>
            <li onClick={() => {}}>
              <p>북마크</p>
            </li>
            {bookMark && (
              <>
                <li>
                  <p>장소</p>
                </li>
                <li>
                  <p>코스</p>
                </li>
              </>
            )}
          </ul>
        </li>
        <li>
          <p>나의 코스</p>
        </li>
        <li>
          <p>나의 후기</p>
        </li>
      </ul>
    </div>
  );
};
