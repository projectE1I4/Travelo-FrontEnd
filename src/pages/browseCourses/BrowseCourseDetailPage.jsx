import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { BrowseContext } from '../../contexts/BrowseContext';
import CourseMiniCard from '../../components/browseCourses/CourseMiniCard';
import ReviewItem from '../../components/browseCourses/ReviewItem';
import useReviewService from '../../hooks/useReviewService';
import styles from '../../styles/pages/browseCourses/BrowseCourseDetail.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faHeart,
  faBookmark,
  faChevronDown,
  faUserPen,
} from '@fortawesome/free-solid-svg-icons';

const BrowseCourseDetailPage = () => {
  const { courseSeq } = useParams();
  const { fetchCourseDetail, courseDetail, loading, error, accessToken } =
    useContext(BrowseContext);
  const [showReviews, setShowReviews] = useState(false);
  const [newReview, setNewReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const [editingReviewSeq, setEditingReviewSeq] = useState(null);
  const [sortOrder, setSortOrder] = useState('popularity'); // 정렬 기준 상태 추가
  const {
    createReview,
    modifyReview,
    deleteReview,
    recommendReview,
    reportReview,
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
    try {
      const newReviewData = await createReview(
        courseSeq,
        newReview,
        accessToken
      );
      console.log('New Review Data:', newReviewData);
      setNewReview('');
      const loginUser = courseDetail.loginUser;
      const completeNewReviewData = {
        ...newReviewData,
        user: loginUser,
        reviewSeq: newReviewData.reviewSeq || Date.now(),
        createDate: new Date().toISOString(), // 현재 시간을 createDate로 설정
        recommendCount: 0,
        reportCount: 0,
        blindYn: 'N',
      };
      setReviews((prevReviews) => {
        const updatedReviews = [completeNewReviewData, ...prevReviews];
        return sortReviews(updatedReviews, sortOrder);
      });

      // 리뷰 수 업데이트
      courseDetail.reviewCount += 1;
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      alert('댓글 작성을 실패했습니다');
    }
  };

  const sortReviews = (reviews, sortOrder) => {
    return [...reviews].sort((a, b) => {
      if (sortOrder === 'popularity') {
        return b.recommendCount - a.recommendCount;
      } else if (sortOrder === 'latest') {
        return new Date(b.createDate) - new Date(a.createDate);
      } else if (sortOrder === 'oldest') {
        return new Date(a.createDate) - new Date(b.createDate);
      }
      return 0;
    });
  };

  const handleEditReview = async (reviewSeq, content) => {
    try {
      const updatedReview = await modifyReview(reviewSeq, content, accessToken);
      console.log('Updated Review:', updatedReview);
      setReviews((prevReviews) =>
        sortReviews(
          prevReviews.map((review) =>
            review.reviewSeq === reviewSeq ? { ...review, content } : review
          ),
          sortOrder
        )
      );
    } catch (error) {
      console.error('댓글 수정 실패:', error);
      alert(`댓글 수정 실패: ${error.message}`);
    }
  };

  const handleDeleteReview = async (reviewSeq) => {
    try {
      if (window.confirm('댓글을 삭제할까요?')) {
        await deleteReview(reviewSeq, accessToken);
        setReviews((prevReviews) =>
          sortReviews(
            prevReviews.filter((review) => review.reviewSeq !== reviewSeq),
            sortOrder
          )
        );

        // 리뷰 수 업데이트
        courseDetail.reviewCount -= 1;
      }
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      alert(`댓글 삭제 실패: ${error.message}`);
    }
  };

  const handleRecommendReview = async (reviewSeq) => {
    try {
      const updatedRecommendYn = await recommendReview(reviewSeq, accessToken);
      setReviews((prevReviews) =>
        sortReviews(
          prevReviews.map((review) =>
            review.reviewSeq === reviewSeq
              ? {
                  ...review,
                  recommendYn: updatedRecommendYn,
                  recommendCount:
                    updatedRecommendYn === 'Y'
                      ? review.recommendCount + 1
                      : review.recommendCount - 1,
                }
              : review
          ),
          sortOrder
        )
      );
    } catch (error) {
      console.error('댓글 추천 실패:', error);
      alert(`댓글 추천 실패: ${error.message}`);
    }
  };

  const handleReportReview = async (reviewSeq) => {
    try {
      const response = await reportReview(reviewSeq, accessToken);
      if (response === '이미 신고한 리뷰입니다.') {
        alert('이미 신고한 리뷰입니다.');
      } else {
        setReviews((prevReviews) =>
          sortReviews(
            prevReviews.map((review) =>
              review.reviewSeq === reviewSeq
                ? { ...review, reportYn: 'Y' }
                : review
            ),
            sortOrder
          )
        );
        alert('신고되었습니다.');
      }
    } catch (error) {
      console.error('댓글 신고 실패:', error);
      alert(`댓글 신고 실패: ${error.message}`);
    }
  };

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    setReviews((prevReviews) => sortReviews(prevReviews, newSortOrder));
  };

  useEffect(() => {
    console.log('Updated Reviews:', reviews); // 디버그 로그 추가
  }, [reviews]);

  if (loading) return <span className="loader"></span>;
  if (error) return <p>Error: {error.message}</p>;
  if (!courseDetail) return <p>Loading...</p>;

  const { course, reviewCount } = courseDetail;

  const obfuscateEmail = (email) => {
    const [username] = email.split('@');
    const obfuscatedUsername =
      username.slice(0, 3) + '*'.repeat(username.length - 3);
    return obfuscatedUsername;
  };

  return (
    <div className="grid-container">
      <div className={styles['course-sidebar']}>
        <h2>장소 목록</h2>
        <div>
          {course.courseList.map((place, index) => (
            <CourseMiniCard key={index} place={place.place} />
          ))}
        </div>
      </div>
      <div className={styles['content-container']}>
        <div className={styles['course-detail']}>
          <div className={styles['heading']}>
            <h1>{course.title}</h1>
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
          <div className={styles['course-info']}>
            <span>
              <FontAwesomeIcon icon={faUserPen} />
              {obfuscateEmail(course.author.username)}
            </span>
            <p className={styles['course-desc']}>{course.description}</p>
          </div>
        </div>
        <div className={styles['reviews-section']}>
          <h2
            onClick={() => setShowReviews(!showReviews)}
            style={{ cursor: 'pointer' }}
          >
            {showReviews
              ? `닫기`
              : `이 코스에 대한 후기보기 ( ${reviewCount}개 )`}
          </h2>
          {showReviews && (
            <div className={styles['reviews-list']}>
              <div className={styles['review-form']}>
                <textarea
                  placeholder="이 코스에 대한 리뷰를 남겨주세요."
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                />
                <div className={styles['btn-wrap']}>
                  <button onClick={handleReviewSubmit} disabled={reviewLoading}>
                    후기 작성하기
                  </button>
                </div>
                {reviewError && <p className="error">{reviewError.message}</p>}
              </div>
              {reviews.length > 1 && ( // 댓글이 있을 때만 드롭다운 보이기
                <div className={styles['dropdown-wrap']}>
                  <div className={styles['dropdown']}>
                    <div className={styles['dropdown-btn']}>
                      {sortOrder === 'popularity'
                        ? '인기순'
                        : sortOrder === 'latest'
                          ? '최신순'
                          : '오래된순'}{' '}
                      <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                    <div className={styles['dropdown-content']}>
                      <a onClick={() => handleSortChange('popularity')}>
                        인기순
                      </a>
                      <a onClick={() => handleSortChange('latest')}>최신순</a>
                      <a onClick={() => handleSortChange('oldest')}>오래된순</a>
                    </div>
                  </div>
                </div>
              )}
              <div className={styles.rw}>
                {reviews.map((review) => (
                  <ReviewItem
                    key={review.reviewSeq}
                    review={review}
                    isEditing={editingReviewSeq === review.reviewSeq}
                    setEditingReviewSeq={setEditingReviewSeq}
                    onEdit={handleEditReview}
                    onDelete={handleDeleteReview}
                    onRecommend={handleRecommendReview}
                    onReport={handleReportReview}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseCourseDetailPage;
