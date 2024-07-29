// CourseGroupCreateModal.jsx
import React, { useEffect, useState } from 'react';
import styles from '../../styles/pages/courseGroup/CourseGroupCreateModal.module.css';
import axiosInstance from '../../utils/axiosInstance';

const CourseGroupCreateModal = ({ show, onClose, onSelectCourse }) => {
  const [activeTab, setActiveTab] = useState('custom');
  const [bookmarks, setBookmarks] = useState([]);
  const [customCourses, setCustomCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (show) {
      if (activeTab === 'custom') {
        fetchCustomCourses();
      } else if (activeTab === 'bookmark') {
        fetchBookmarks();
      }
    }
  }, [activeTab, show]);

  const fetchCustomCourses = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axiosInstance.get('/user/customCourses');
      console.log('Custom Courses:', response.data.customCourses); // 디버깅용 로그
      setCustomCourses(response.data.customCourses);
    } catch (error) {
      setError('커스텀 코스를 불러오는 중 오류가 발생했습니다.');
    }
    setLoading(false);
  };

  const fetchBookmarks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axiosInstance.get('/user/courseBookmarks');
      console.log('Bookmarks:', response.data.bookmarks);
      setBookmarks(response.data.bookmarks);
    } catch (error) {
      setError('북마크된 코스를 불러오는 중 오류가 발생했습니다.');
    }
    setLoading(false);
  };

  if (!show) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'bookmark') {
      setLoading(true);
      setError('');
    }
  };

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
    <div className={styles['modal-overlay']} onClick={handleOverlayClick}>
      <div className={styles['modal-content']}>
        <button onClick={onClose} className={styles['modal-close']}>
          X
        </button>
        <div className={styles['modal-header']}>
          <button
            className={`${styles['tab-button']} ${activeTab === 'custom' ? styles['active'] : ''}`}
            onClick={() => handleTabClick('custom')}
          >
            커스텀 코스
          </button>
          <button
            className={`${styles['tab-button']} ${activeTab === 'bookmark' ? styles['active'] : ''}`}
            onClick={() => handleTabClick('bookmark')}
          >
            북마크 코스
          </button>
        </div>
        <div className={styles['modal-inner-content']}>
          {activeTab === 'custom' && (
            <div>
              {loading ? (
                <p>로딩 중...</p>
              ) : error ? (
                <p className={styles['error']}>{error}</p>
              ) : (
                customCourses.map((course, index) => (
                  <div
                    key={index}
                    className={styles['course-item']}
                    onClick={() => onSelectCourse(course)}
                  >
                    <h3>{course.title}</h3>
                    <div className={styles['course-item-description']}>
                      Description
                    </div>
                    <div className={styles['course-item-under-wrap']}>
                      <p>{course.description || ''}</p>
                      <div>{formatDate(course.createDate)}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
          {activeTab === 'bookmark' && (
            <div>
              {loading ? (
                <p>로딩 중...</p>
              ) : error ? (
                <p className={styles['error']}>{error}</p>
              ) : (
                bookmarks.map((bookmark, index) => (
                  <div
                    key={index}
                    className={styles['course-item']}
                    onClick={() => onSelectCourse(bookmark)}
                  >
                    <h3>{bookmark.title}</h3>

                    <div className={styles['course-item-description']}>
                      Description
                    </div>
                    <div className={styles['course-item-under-wrap']}>
                      <p>{bookmark.description || ''}</p>
                      <div>{formatDate(bookmark.createDate)}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseGroupCreateModal;
