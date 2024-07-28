// CourseCard.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap, faPlus } from '@fortawesome/free-solid-svg-icons';
import Modal from './CourseGroupCreateModal';
import styles from '../../styles/pages/courseGroup/CourseGroupCreateModal.module.css';

const CourseGroupCard = ({ index, onSelectCourse }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleCourseSelect = (course) => {
    onSelectCourse(index, course);
    handleCloseModal();
  };

  return (
    <div className={styles['course-card']} onClick={handleOpenModal}>
      <div className={styles['card-number']}>{index + 1}</div>
      <div className={styles['card-content']}>
        <div className={styles['unfilled']}>
          <FontAwesomeIcon icon={faMap} className={styles['unfilled-icon1']} />
          <FontAwesomeIcon icon={faPlus} className={styles['unfilled-icon2']} />
        </div>
      </div>
      <Modal show={showModal} onClose={handleCloseModal}>
        {/* 모달 내용: 코스 선택 리스트 */}
        <ul>
          {/* 여기서는 예시로 몇 가지 코스를 보여줍니다. 실제로는 API 호출 등을 통해 데이터를 불러옵니다. */}
          {['코스1', '코스2', '코스3'].map((course, idx) => (
            <li key={idx} onClick={() => handleCourseSelect(course)}>
              {course}
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};

export default CourseGroupCard;
