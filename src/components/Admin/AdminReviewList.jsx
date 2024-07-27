import React, { useEffect, useState } from 'react';
import { getAllReviews } from '../../services/adminService';
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
      const data = await getAllReviews(sortOrder);
      console.log('Fetched reviews:', data);
      setReviews(data);
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
  const filteredReviews = reviews.filter((item) => {
    if (filter === 'all') return true;
    return filter === 'blind'
      ? item.review.blindYn === 'Y'
      : item.review.blindYn === 'N';
  });

  // 전체 리뷰, 블라인드된 리뷰, 보이는 리뷰 개수 계산
  const allCount = reviews.length;
  const blindCount = reviews.filter(
    (item) => item.review.blindYn === 'Y'
  ).length;
  const visibleCount = reviews.filter(
    (item) => item.review.blindYn === 'N'
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
        {filteredReviews.map((item, index) => (
          <li key={`${item.review.reviewSeq}-${index}`}>
            코스 제목: {item.courseTitle}
            <br />
            작성자: {item.review.user?.username || 'Unknown'}, 작성 일자:{' '}
            {item.review.createDate
              ? formatDate(item.review.createDate)
              : '알 수 없음'}
            <br />
            <span className="reviewContent">댓글: {item.review.content}</span>
            <br />
            신고 수: {item.review.reportCount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminReviewList;
