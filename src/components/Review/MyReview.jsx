import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  reviewsList,
  updateReview,
  deleteReview,
} from '../../services/myReviewService';
import '../../css/myReviewList.css';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState('latest');
  const [editReviewId, setEditReviewId] = useState(null);
  const [editContent, setEditContent] = useState('');

  // useCallback을 사용하여 함수의 중복 호출을 방지합니다.
  const loadReviews = useCallback(async () => {
    try {
      const data = await reviewsList(page, sortBy);
      setReviews(data.paging.content || []);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, [page, sortBy]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const maskUsername = (username) => {
    return username.substring(0, 3) + '****';
  };

  const reviewEdit = (reviewSeq) => {
    setEditReviewId(reviewSeq);
    const reviewToEdit = reviews.find(
      (item) => item.review.reviewSeq === reviewSeq
    );
    setEditContent(reviewToEdit.review.content);
  };

  const editSave = async (reviewSeq) => {
    try {
      await updateReview(reviewSeq, editContent);
      setEditReviewId(null);
      loadReviews();
    } catch (err) {
      console.error('수정 오류 :', err);
    }
  };

  const deleteItem = async (reviewSeq) => {
    if (window.confirm('정말 리뷰를 삭제하시겠습니까?')) {
      try {
        await deleteReview(reviewSeq);
        loadReviews(); // 리뷰 목록 새로 고침
      } catch (err) {
        console.error('삭제 오류 :', err);
      }
    }
  };

  // 날짜 형식 변경 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading reviews: {error.message}</p>;

  return (
    <div className="myReviews">
      <h1>Review List</h1>
      {reviews.length === 0 ? (
        <p>리뷰가 없습니다.</p>
      ) : (
        <ul className="myReviewList">
          {reviews.map((item) => (
            <li key={item.review.reviewSeq} className="listItem">
              <p>{maskUsername(item.review.user.username)}</p>
              <h2>
                <Link to={`/course/${item.courseSeq}`}>{item.courseTitle}</Link>
              </h2>
              {editReviewId === item.review.reviewSeq ? (
                <div>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <button
                    className="editBtn1 btn_type_2"
                    onClick={() => editSave(item.review.reviewSeq)}
                  >
                    저장
                  </button>
                  <button
                    className="editBtn1 btn_type_2"
                    onClick={() => setEditReviewId(null)}
                  >
                    취소
                  </button>
                </div>
              ) : (
                <>
                  <button
                    className="editBtn btn_type_1"
                    onClick={() => reviewEdit(item.review.reviewSeq)}
                  >
                    수정
                  </button>
                  <button
                    className="editBtn btn_type_1"
                    onClick={() => deleteItem(item.review.reviewSeq)}
                  >
                    삭제
                  </button>
                  <p className="content">{item.review.content}</p>
                  <p>작성일자: {formatDate(item.review.createDate)}</p>
                  <p>추천 수: {item.review.recommendCount}</p>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewList;
