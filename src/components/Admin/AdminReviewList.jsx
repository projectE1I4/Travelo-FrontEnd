import React, { useEffect, useState } from 'react';
import { getReviewList } from '../../services/adminService';
import { formatDate } from '../common/formatDate';
import '../../css/Admin/AdminReview.css';

const AdminReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('latest'); // 기본 정렬값 설정
  const [filter, setFilter] = useState('all'); // 필터링 조건

  const fetchReviews = async (sortOrder) => {
    try {
      const data = await getReviewList(0, sortOrder);
      setReviews(data.content);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(sortBy);
  }, [sortBy]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // 필터링된 리뷰 목록
  const filteredReviews = reviews.filter((review) => {
    if (filter === 'all') return true;
    return filter === 'blind' ? review.blindYn === 'Y' : review.blindYn === 'N';
  });

  // 전체 리뷰, 블라인드된 리뷰, 보이는 리뷰 개수 계산
  const allCount = reviews.length;
  const blindCount = reviews.filter((review) => review.blindYn === 'Y').length;
  const visibleCount = reviews.filter(
    (review) => review.blindYn === 'N'
  ).length;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="adminReviewList">
      <h1>전체 리뷰</h1>
      <div className="controls">
        <div>
          <button onClick={() => setSortBy('latest')}>최신순</button>
          <button onClick={() => setSortBy('oldest')}>오래된 순</button>
        </div>
        <select onChange={handleFilterChange} value={filter}>
          <option value="all">전체 ({allCount})</option>
          <option value="blind">블라인드된 리뷰 ({blindCount})</option>
          <option value="visible">보이는 리뷰 ({visibleCount})</option>
        </select>
      </div>
      <ul>
        {filteredReviews.map((review) => (
          <li key={review.reviewSeq}>
            작성자 : {review.user.username}, 작성 일자 :{' '}
            {formatDate(review.createDate)}
            <br />
            <span className="reviewContent">
              작성 내용 : {review.content.slice(0, 50)}...
            </span>
            <br />
            신고 수 : {review.reportCount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminReviewList;
