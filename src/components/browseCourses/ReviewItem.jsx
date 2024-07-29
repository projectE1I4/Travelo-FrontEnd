import { useState } from 'react';
import styles from '../../styles/components/browseCourses/ReviewItem.module.css';

const ReviewItem = ({ review, onEdit, isEditing, setEditingReviewSeq }) => {
  const [editContent, setEditContent] = useState(review.content);

  const handleEditClick = () => {
    setEditingReviewSeq(review.reviewSeq);
  };

  const handleSaveClick = () => {
    onEdit(review.reviewSeq, editContent);
    setEditingReviewSeq(null);
  };

  const handleCancelClick = () => {
    setEditingReviewSeq(null);
  };

  return (
    <div className={styles.review}>
      <p>
        <strong>{review.user?.username || 'Unknown User'}</strong>
      </p>
      {isEditing ? (
        <div>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <button onClick={handleSaveClick}>저장</button>
          <button onClick={handleCancelClick}>취소</button>
        </div>
      ) : (
        <p>{review.content}</p>
      )}
      {review.user?.userSeq === parseInt(sessionStorage.getItem('userSeq')) && (
        <div className={styles['button-wrap']}>
          <button onClick={handleEditClick}>수정</button>
          <button>삭제</button>
        </div>
      )}
    </div>
  );
};

export default ReviewItem;
