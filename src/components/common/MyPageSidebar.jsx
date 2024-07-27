import React, { useState } from 'react';
import styles from '../../styles/components/MypageSidebar.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const MyPageSidebar = () => {
  const [userEdit, setUserEdit] = useState('false');
  const [bookMark, setBookMark] = useState('false');
  const [placeBookMark, setPlaceBookMark] = useState('false');
  const [courseBookMark, setCourseBookMark] = useState('false');
  const [myCourse, setMyCourse] = useState('false');
  const [myReview, setMyReview] = useState('false');
  const { user } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const handleSidebar = () => {
    // url 따라서 active 주기
  };

  const isActive = (path) => {
    return location.pathname === path ? styles.MSactive : '';
  };

  const openBookmark = (e) => {
    e.preventDefault();
    setBookMark((prev) => !prev);
  };

  const getProfileLink = () => {
    if (user) {
      if (user.oauthType === 'google') {
        return '/mypage/modifyprofileGoogle';
      } else if (user.ouathType === 'kakao') {
        return '/mypage/modifyprofileKakao';
      } else if (user.oauthType === 'naver') {
        return '/mypage/modifyprofileNaver';
      }
    }
    return '/mypage/modifyprofile';
  };

  const profileLink = getProfileLink();

  return (
    <div className={styles['MS-container']}>
      <h2 className={styles['MS-title']}>마이페이지</h2>
      <div className={styles['MS-item-box']}>
        <ul>
          <li
            onClick={(e) => {}}
            className={`${styles['MS-item']} ${isActive(profileLink)}`}
          >
            <Link to={getProfileLink}>
              <p>회원 정보 수정</p>
            </Link>
          </li>
          <li onClick={openBookmark} className={styles['MS-item']}>
            <Link to="/mypage/">
              <p>북마크</p>
            </Link>
          </li>
          {bookMark === true && (
            <li className={styles['MS-bookmark-box']}>
              <ul>
                <li className={styles['MS-item']}>
                  <Link to="/mypage/">
                    <p>장소</p>
                  </Link>
                </li>
                <li className={styles['MS-item']}>
                  <Link to="/mypage/">
                    <p>코스</p>
                  </Link>
                </li>
              </ul>
            </li>
          )}
          <li
            className={`${styles['MS-item']} ${isActive('/mypage/courseGroup' || '/mypage/myCourses')}`}
          >
            {/* <Link to="/mypage/myCourses"> */}
            <Link to="/mypage/courseGroup">
              <p>나의 코스</p>
            </Link>
          </li>
          <li className={styles['MS-item']}>
            <Link to="/mypage/myReviews">
              <p>나의 후기</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MyPageSidebar;
