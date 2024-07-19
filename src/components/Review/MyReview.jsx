import React, { useEffect, useState, useCallback } from 'react';
import { reviewsList } from '../../services/myReviewService';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState('latest');

  // useCallback을 사용하여 함수의 중복 호출을 방지합니다.
  const loadReviews = useCallback(async () => {
    try {
      const data = await reviewsList(page, sortBy);
      setReviews(data || []);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, [page, sortBy]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading reviews: {error.message}</p>;

  return (
    <div>
      <h1>Review List</h1>
      {reviews.length === 0 ? (
        <p>No reviews available</p>
      ) : (
        <ul>
          {reviews.map((item) => (
            <li key={item.review.reviewSeq}>
              <h2>{item.courseTitle}</h2>
              <p>{item.review.content}</p>
              <p>Created at: {item.review.createDate}</p>
              <p>Recommended: {item.review.recommendCount}</p>
              <p>Reported: {item.review.reportCount}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewList;
