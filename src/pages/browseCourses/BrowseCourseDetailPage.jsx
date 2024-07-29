import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { BrowseContext } from '../../contexts/BrowseContext';
import CourseMiniCard from '../../components/browseCourses/CourseMiniCard';
import ReviewItem from '../../components/browseCourses/ReviewItem';
import useReviewService from '../../hooks/useReviewService';
import styles from '../../styles/pages/browseCourses/BrowseCourseDetail.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons';

const BrowseCourseDetailPage = () => {
  const { courseSeq } = useParams();
  const { fetchCourseDetail, courseDetail, loading, error } =
    useContext(BrowseContext);
  const [showReviews, setShowReviews] = useState(false);
  const [newReview, setNewReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const [editingReviewSeq, setEditingReviewSeq] = useState(null);
  const {
    createReview,
    modifyReview,
    loading: reviewLoading,
    error: reviewError,
  } = useReviewService();

  useEffect(() => {
    if (courseSeq) {
      fetchCourseDetail(courseSeq);
    }
  }, [courseSeq, fetchCourseDetail]);

  useEffect(() => {
    if (courseDetail) {
      setReviews(courseDetail.paging.content);
    }
  }, [courseDetail]);

  const handleReviewSubmit = async () => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (!accessToken) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const newReviewData = await createReview(
        courseSeq,
        newReview,
        accessToken
      );
      console.log('New Review Data:', newReviewData); // 디버그 로그 추가
      setNewReview('');
      const loginUser = courseDetail.loginUser;
      setReviews((prevReviews) => [
        { ...newReviewData, user: loginUser },
        ...prevReviews,
      ]);
    } catch (error) {
      console.error('댓글 작성 실패:', error);
    }
  };

  const handleEditReview = async (reviewSeq, content) => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (!accessToken) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const updatedReview = await modifyReview(reviewSeq, content, accessToken);
      console.log('Updated Review:', updatedReview); // 디버그 로그 추가
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.reviewSeq === reviewSeq
            ? { ...review, content: updatedReview.content }
            : review
        )
      );
    } catch (error) {
      console.error('댓글 수정 실패:', error);
      alert(`댓글 수정 실패: ${error.message}`);
    }
  };

  useEffect(() => {
    console.log('Updated Reviews:', reviews); // 디버그 로그 추가
  }, [reviews]);

  if (loading) return <span className="loader"></span>;
  if (error) return <p>Error: {error.message}</p>;
  if (!courseDetail) return <p>Loading...</p>;

  const { course, reviewCount } = courseDetail;

  return (
    <div className="grid-container">
      <div className={styles['course-sidebar']}>
        <h2>장소</h2>
        <div>
          {course.courseList.map((place, index) => (
            <CourseMiniCard key={index} place={place.place} />
          ))}
        </div>
      </div>
      <div className={styles['content-container']}>
        <div className={styles['map-container']}>
          <div className={styles.map}>지도 영역</div>
        </div>
        <div className={styles['course-detail']}>
          <h1>{course.title}</h1>
          <p>{course.description}</p>
          <div className={styles['course-stats']}>
            <span>
              <FontAwesomeIcon icon={faEye} /> {course.viewCount}
            </span>
            <span>
              <FontAwesomeIcon icon={faHeart} /> {course.likeCount}
            </span>
            <span>
              <FontAwesomeIcon icon={faBookmark} /> {reviewCount}
            </span>
          </div>
        </div>
        <div className={styles['reviews-section']}>
          <h2
            onClick={() => setShowReviews(!showReviews)}
            style={{ cursor: 'pointer' }}
          >
            {showReviews ? `후기닫기` : `후기보기(${reviewCount}개)`}
          </h2>
          {showReviews && (
            <div className={styles['reviews-list']}>
              <div className={styles['review-form']}>
                <textarea
                  placeholder="여기는 댓글쓰는곳...후기쓰는곳~~~"
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                />
                <button onClick={handleReviewSubmit} disabled={reviewLoading}>
                  후기 작성
                </button>
                {reviewError && <p className="error">{reviewError.message}</p>}
              </div>
              {reviews.map((review) => (
                <ReviewItem
                  key={review.reviewSeq}
                  review={review}
                  isEditing={editingReviewSeq === review.reviewSeq}
                  setEditingReviewSeq={setEditingReviewSeq}
                  onEdit={handleEditReview}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseCourseDetailPage;
