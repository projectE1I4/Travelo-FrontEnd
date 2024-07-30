import React, { useEffect, useState } from 'react';
import {
  resetReportCount,
  blindReview,
  getAllReviews,
} from '../../services/adminService';
import { formatDate } from '../common/formatDate';
import '../../css/Admin/AdminReview.css';

const AdminBlindReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [totalReportedCount, setTotalReportedCount] = useState(0);
  const [blindCount, setBlindCount] = useState(0);
  const [page, setPage] = useState(0); // 페이지 상태 추가
  const [totalPages, setTotalPages] = useState(0);

  const fetchReviews = async () => {
    try {
      const allReviews = await getAllReviews();

      // 신고된 리뷰 목록
      const blindReviewsData = allReviews.filter(
        (reviewData) =>
          reviewData.review.reportCount >= 5 &&
          reviewData.review.blindYn !== 'Y'
      );
      setReviews(blindReviewsData);

      // 전체 블라인드된 댓글 수 계산
      const blindReviews = allReviews.filter(
        (reviewData) => reviewData.review.blindYn === 'Y'
      );
      setBlindCount(blindReviews.length);

      // 전체 신고된 댓글 수 계산
      const reportedReviews = allReviews.filter(
        (reviewData) => reviewData.review.reportCount >= 5
      );
      setTotalReportedCount(reportedReviews.length);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // 신고 수 초기화
  const resetBtn = async (reviewSeq) => {
    const confirmReset = window.confirm('신고 수를 초기화하시겠습니까?');
    if (confirmReset) {
      try {
        await resetReportCount(reviewSeq);
        fetchReviews();
      } catch (error) {
        setError(error);
      }
    }
  };

  // 리뷰 블라인드 처리
  const blindBtn = async (reviewSeq) => {
    const confirmBlind = window.confirm('이 리뷰를 블라인드 처리하시겠습니까?');
    if (confirmBlind) {
      try {
        console.log('블라인드 시작');
        await blindReview(reviewSeq);
        fetchReviews();
      } catch (error) {
        console.error('Error blinding review:', error);
        setError(error);
      }
    }
  };

  return (
    <div className="adminReviewList">
      <h1>신고된 리뷰 목록</h1>
      <p>
        전체 신고 댓글 : {totalReportedCount}개 | 블라인드 댓글 : {blindCount}개
      </p>
      <ul>
        {reviews.map(
          (reviewData) =>
            reviewData.review.blindYn !== 'Y' && (
              <li key={reviewData.review.reviewSeq}>
                코스 제목: {reviewData.courseTitle}
                <br />
                작성자 : {reviewData.review.user.username}, 작성 일자 :{' '}
                {formatDate(reviewData.review.createDate)}
                <br />
                <span className="reviewContent">
                  작성 내용 : {reviewData.review.content.slice(0, 50)}...
                </span>
                <br />
                신고 수 : {reviewData.review.reportCount}
                <br />
                <button onClick={() => resetBtn(reviewData.review.reviewSeq)}>
                  초기화
                </button>
                <br />
                <button onClick={() => blindBtn(reviewData.review.reviewSeq)}>
                  블라인드
                </button>
              </li>
            )
        )}
      </ul>
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page <= 0}>
          이전
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages - 1}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default AdminBlindReviewList;
