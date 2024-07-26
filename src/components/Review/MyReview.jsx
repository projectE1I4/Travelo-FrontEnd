import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  reviewsList,
  updateReview,
  deleteReview,
} from '../../services/myReviewService';
import { formatDate } from '../common/formatDate';
import '../../css/myReviewList.css';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState('latest');
  const [editReviewId, setEditReviewId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [expandedReviews, setExpandedReviews] = useState([]); // 내용 더보기

  // useCallback: 중복 호출 방지
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

  // username ** 처리
  const maskUsername = (username) => {
    return username.substring(0, 3) + '****';
  };

  // 리뷰 수정
  const reviewEdit = (reviewSeq) => {
    setEditReviewId(reviewSeq);
    const reviewToEdit = reviews.find(
      (item) => item.review.reviewSeq === reviewSeq
    );
    setEditContent(reviewToEdit.review.content);
  };

  // 리뷰 수정사항 저장
  const editSave = async (reviewSeq) => {
    const originalReview = reviews.find(
      (item) => item.review.reviewSeq === reviewSeq
    ).review.content;

    if (editContent === originalReview) {
      alert('변동 사항이 없습니다.');
      return;
    }
    try {
      const updatedReview = await updateReview(reviewSeq, editContent);
      setReviews((prevReviews) =>
        prevReviews.map((item) =>
          item.review.reviewSeq === reviewSeq
            ? {
                ...item,
                review: {
                  ...item.review,
                  content: editContent,
                  modified: true,
                },
              }
            : item
        )
      );
      setEditReviewId(null);
    } catch (err) {
      console.error('수정 오류 :', err);
    }
  };

  // 리뷰 삭제
  const deleteItem = async (reviewSeq) => {
    if (window.confirm('정말 리뷰를 삭제하시겠습니까?')) {
      try {
        await deleteReview(reviewSeq);
        loadReviews();
      } catch (err) {
        console.error('삭제 오류 :', err);
      }
    }
  };

  // 리뷰 내용 더보기
  const showMore = (reviewSeq) => {
    setExpandedReviews((prevExpandedReviews) => [
      ...prevExpandedReviews,
      reviewSeq,
    ]);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading reviews: {error.message}</p>;

  return (
    <div className="myReviews">
      <h1>나의 후기</h1>
      {reviews.length === 0 ? (
        <p>리뷰가 없습니다.</p>
      ) : (
        <ul className="myReviewList">
          {reviews.map((item) => (
            <li key={item.review.reviewSeq} className="listItem">
              <div className="userInfo">
                <p>{maskUsername(item.review.user.username)}</p>
                <p>작성일자: {formatDate(item.review.createDate)}</p>
                {item.review.modified && <p>(수정됨)</p>}
                <p>추천 수: {item.review.recommendCount}</p>
              </div>
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
                    className="reviewSave btn_type_2"
                    onClick={() => editSave(item.review.reviewSeq)}
                  >
                    저장
                  </button>
                  <button
                    className="cancleBtn btn_type_2"
                    onClick={() => setEditReviewId(null)}
                  >
                    취소
                  </button>
                </div>
              ) : (
                <>
                  <button
                    className="reviewEdit btn_type_1"
                    onClick={() => reviewEdit(item.review.reviewSeq)}
                  >
                    수정
                  </button>
                  <button
                    className="reviewDelete btn_type_1"
                    onClick={() => deleteItem(item.review.reviewSeq)}
                  >
                    삭제
                  </button>
                  <p className="content">
                    {expandedReviews.includes(item.review.reviewSeq) ? (
                      item.review.content
                    ) : (
                      <>
                        {item.review.content.length > 100
                          ? item.review.content.substring(0, 100) + '...'
                          : item.review.content}
                        {item.review.content.length > 100 && (
                          <button
                            onClick={() => showMore(item.review.reviewSeq)}
                          >
                            더보기
                          </button>
                        )}
                      </>
                    )}
                  </p>
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
