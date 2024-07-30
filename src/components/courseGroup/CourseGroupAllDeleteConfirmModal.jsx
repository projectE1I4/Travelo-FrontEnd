import styles from '../../styles/pages/courseGroup/CourseGroupDeleteConfirmModal.module.css';

const CourseGroupAllDeleteConfirmModal = ({ show, onClose, onConfirm }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles['modal-overlay']} onClick={onClose}>
      <div
        className={styles['modal-content']}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>삭제 확인</h2>
        <p>선택한 항목을 삭제하시겠습니까?</p>
        <div className={styles['modal-buttons']}>
          <button onClick={onClose}>취소</button>
          <button onClick={onConfirm}>삭제</button>
        </div>
      </div>
    </div>
  );
};

export default CourseGroupAllDeleteConfirmModal;
