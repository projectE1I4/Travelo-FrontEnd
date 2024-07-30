import { useContext, useEffect, useState } from 'react';
import { CourseGroupContext } from '../../contexts/CourseGroupContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../../styles/pages/courseGroup/CourseGroupList.module.css';
import {
  faMapLocationDot,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import GroupPagination from '../common/GroupPagination';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import CourseGroupDeleteConfirmModal from './CourseGroupDeleteConfirmModal';
import CourseGroupAllDeleteConfirmModal from './CourseGroupAllDeleteConfirmModal';

const CourseGroupList = () => {
  const { courseGroups, loading, error, fetchCourseGroups } =
    useContext(CourseGroupContext);
  const [sortedCourseGroups, setSortedCourseGroups] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAllDeleteModal, setShowAllDeleteModal] = useState(false);
  const [deleteGroupIds, setDeleteGroupIds] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const itemsPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    if (courseGroups) {
      // 날짜를 기준으로 내림차순 정렬
      const sortedGroups = [...courseGroups].sort(
        (a, b) => new Date(b.createDate) - new Date(a.createDate)
      );
      setSortedCourseGroups(sortedGroups);
      setCurrentPage(1);
    }
  }, [courseGroups]);

  if (loading) {
    return <p>Loading...</p>;
  }

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

  const handleDeleteClick = (group) => {
    setSelectedGroup(group);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedGroup) return;
    try {
      await axiosInstance.post(
        `/user/group/delete/${selectedGroup.courseGroupSeq}`
      );
      setSortedCourseGroups(
        sortedCourseGroups.filter(
          (g) => g.courseGroupSeq !== selectedGroup.courseGroupSeq
        )
      );
    } catch (error) {
      console.error('Failed to delete group:', error);
    } finally {
      setShowDeleteModal(false);
      setSelectedGroup(null);
    }
  };

  const handleCardClick = (courseGroupSeq) => {
    if (!isDeleting) {
      navigate(`/mypage/courseGroupDetail/${courseGroupSeq}`);
    } else {
      handleSelectGroup(courseGroupSeq);
    }
  };

  const indexOfLastGroup = currentPage * itemsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - itemsPerPage;
  const currentGroups = sortedCourseGroups.slice(
    indexOfFirstGroup,
    indexOfLastGroup
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSelectDeleteClick = () => {
    setIsDeleting(true);
  };

  const handleCancelDeleteClick = () => {
    setIsDeleting(false);
    setDeleteGroupIds([]);
  };

  const handleSelectGroup = (courseGroupSeq) => {
    setDeleteGroupIds((prev) =>
      prev.includes(courseGroupSeq)
        ? prev.filter((id) => id !== courseGroupSeq)
        : [...prev, courseGroupSeq]
    );
  };

  const handleAllDeleteClick = () => {
    setShowAllDeleteModal(true);
  };

  const handleAllDeleteConfirm = async () => {
    setShowAllDeleteModal(false);
    try {
      const response = await axiosInstance.post(`/user/group/deleteGroups`, {
        courseGroupSeqs: deleteGroupIds,
      });
      if (response.status === 200) {
        fetchCourseGroups(); // Fetch the updated list after deletion
        setDeleteGroupIds([]); // Clear the selected group IDs
        setIsDeleting(false); // Exit delete mode
      } else {
        console.error('Failed to delete group:', response.data);
      }
    } catch (error) {
      console.error('Failed to delete group:', error);
    }
  };

  return (
    <div className={styles['group-box']}>
      <div className={styles['group-btn-wrap']}>
        {!isDeleting ? (
          <>
            <button type="button" className={styles['group-btn']}>
              <Link to="/courseGroup/create">그룹 생성</Link>
            </button>

            <button
              type="button"
              className={styles['group-btn']}
              onClick={handleSelectDeleteClick}
            >
              선택 삭제
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className={styles['group-btn']}
              onClick={handleAllDeleteClick}
            >
              삭제하기
            </button>
            <button
              type="button"
              className={styles['group-btn']}
              onClick={handleCancelDeleteClick}
            >
              취소하기
            </button>
          </>
        )}
      </div>
      <div className={styles['group-content-box']}>
        {sortedCourseGroups.map((group) => (
          <div
            key={group.courseGroupSeq}
            className={`${styles['group-card']} ${
              deleteGroupIds.includes(group.courseGroupSeq)
                ? styles.selected
                : ''
            }`}
            onClick={() => handleCardClick(group.courseGroupSeq)}
          >
            <div className={styles['group-date-wrap']}>
              <p>{formatDate(group.createDate)}</p>
            </div>
            <div className={styles['group-title-wrap']}>
              <FontAwesomeIcon
                icon={faMapLocationDot}
                className={styles['group-title-icon']}
              />
              <h3>{group.title}</h3>
            </div>
            <ul className={styles['group-course-title-wrap']}>
              {group.courseGroupList.map((courseGroupList) => (
                <li key={courseGroupList.courseGroupListSeq}>
                  <h4>{courseGroupList.course.title}</h4>
                </li>
              ))}
            </ul>
            <div className={styles['group-delete-wrap']}>
              <FontAwesomeIcon
                icon={faTrashCan}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(group);
                }}
              />
            </div>
            {isDeleting && (
              <div className={styles['group-delete-wrap']}>
                <FontAwesomeIcon
                  icon={faTrashCan}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(group);
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <GroupPagination
        itemsPerPage={itemsPerPage}
        totalItems={sortedCourseGroups.length}
        paginate={paginate}
      />
      <CourseGroupDeleteConfirmModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
      />
      <CourseGroupAllDeleteConfirmModal
        show={showAllDeleteModal}
        onClose={() => setShowAllDeleteModal(false)}
        onConfirm={handleAllDeleteConfirm}
      />
    </div>
  );
};

export default CourseGroupList;
