import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faPen,
  faTrashCan,
  faThumbsUp,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/components/browseCourses/ReviewItem.module.css';

const obfuscateEmail = (email) => {
  const [username] = email.split('@');
  const obfuscatedUsername =
    username.slice(0, 3) + '*'.repeat(username.length - 3);
  return obfuscatedUsername;
};

const ReviewItem = ({
  review,
  onEdit,
  onDelete,
  onRecommend,
  onReport,
  isEditing,
  setEditingReviewSeq,
}) => {
  const { user } = useAuth();
  const [editContent, setEditContent] = useState(review.content || '');
  const [recommendYn, setRecommendYn] = useState(review.recommendYn || 'N');
  const [recommendCount, setRecommendCount] = useState(
    review.recommendCount || 0
  );

  useEffect(() => {
    setEditContent(review.content || '');
    setRecommendYn(review.recommendYn || 'N');
    setRecommendCount(review.recommendCount || 0);
  }, [review]);

  const handleEditClick = () => {
    setEditingReviewSeq(review.reviewSeq);
  };

  const handleSaveClick = () => {
    if (editContent.trim()) {
      onEdit(review.reviewSeq, editContent);
    } else {
      console.error('내용이 비어 있습니다.');
    }
    setEditingReviewSeq(null);
  };

  const handleCancelClick = () => {
    setEditingReviewSeq(null);
  };

  const handleDeleteClick = () => {
    onDelete(review.reviewSeq);
  };

  const handleRecommendClick = async () => {
    try {
      const updatedRecommendYn = await onRecommend(review.reviewSeq);
      const updatedRecommendCount =
        updatedRecommendYn === 'Y' ? recommendCount + 1 : recommendCount - 1;
      setRecommendYn(updatedRecommendYn);
      setRecommendCount(updatedRecommendCount);
    } catch (error) {
      console.error('추천 실패:', error);
    }
  };

  const handleReportClick = () => {
    onReport(review.reviewSeq);
  };

  if (!review || !review.reviewSeq) return null;

  return (
    <div className={styles.review}>
      <div className={styles['review-info']}>
        <span>
          <FontAwesomeIcon icon={faUser} />
          {review.user?.username
            ? obfuscateEmail(review.user.username)
            : 'Unknown User'}
        </span>
        {user && review.user?.userSeq === user.userSeq && (
          <div className={styles['button-md-wrap']}>
            <button onClick={handleEditClick}>수정</button>
            <button onClick={handleDeleteClick}>삭제</button>
          </div>
        )}
      </div>
      {isEditing ? (
        <div className={styles['review-md']}>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <div className={styles['button-md-wrap']}>
            <button onClick={handleSaveClick}>수정내용 저장</button>
            <button onClick={handleCancelClick}>취소</button>
          </div>
        </div>
      ) : (
        <p>{review.content}</p>
      )}
      <div className={styles['button-wrap']}>
        <button onClick={handleRecommendClick}>
          <FontAwesomeIcon icon={faThumbsUp} /> 추천 {recommendCount}
        </button>
        {user && review.user?.userSeq !== user.userSeq && (
          <button onClick={handleReportClick} className={styles['report']}>
            <FontAwesomeIcon icon={faTriangleExclamation} /> 신고
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewItem;
