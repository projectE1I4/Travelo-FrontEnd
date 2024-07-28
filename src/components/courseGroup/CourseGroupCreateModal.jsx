// Modal.jsx
import React from 'react';
import styles from '../../styles/pages/courseGroup/CourseGroupCreateModal.module.css';

const CourseGroupCreateModal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className={styles['modal-overlay']}>
      <div className={styles['modal-content']}>
        <button onClick={onClose} className={styles['modal-close']}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default CourseGroupCreateModal;
