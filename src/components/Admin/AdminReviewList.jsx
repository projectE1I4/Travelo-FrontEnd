import React, { useEffect, useState } from 'react';
import {
  getAllReviews,
  deleteReview,
  deleteReviews,
} from '../../services/adminService';
import { formatDate } from '../common/formatDate';
import '../../css/Admin/AdminReview.css';

const AdminReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedReviews, setSelectedReviews] = useState([]);
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

  const reviewDeleteBtn = async (reviewSeq) => {
    if (window.confirm('정말로 이 리뷰를 삭제하시겠습니까?')) {
      try {
        await deleteReview(reviewSeq);
        setReviews(
          reviews.filter((review) => review.review.reviewSeq !== reviewSeq)
        );
        alert('리뷰가 성공적으로 삭제되었습니다.');
      } catch (err) {
        setError(err);
        alert('리뷰 삭제에 실패했습니다.');
      }
    }
  };

  //선택 리뷰 삭제
  const deleteSelectedReviews = async () => {
    if (selectedReviews.length === 0) {
      alert('삭제할 리뷰를 선택하세요.');
      return;
    }
    if (window.confirm('선택한 리뷰를 삭제하시겠습니까?')) {
      try {
        await deleteReviews(selectedReviews);
        setReviews(
          reviews.filter(
            (review) => !selectedReviews.includes(review.review.reviewSeq)
          )
        );
        setSelectedReviews([]);
        alert('선택한 리뷰가 성공적으로 삭제되었습니다.');
      } catch (err) {
        setError(err);
        alert('선택한 리뷰 삭제에 실패했습니다.');
      }
    }
  };

  const toggleSelectReview = (reviewSeq) => {
    setSelectedReviews((prevSelected) =>
      prevSelected.includes(reviewSeq)
        ? prevSelected.filter((seq) => seq !== reviewSeq)
        : [...prevSelected, reviewSeq]
    );
  };

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
        <button onClick={deleteSelectedReviews}>선택한 리뷰 삭제</button>
        <select onChange={handleFilterChange} value={filter}>
          <option value="all">전체 ({allCount})</option>
          <option value="blind">블라인드된 리뷰 ({blindCount})</option>
          <option value="visible">보이는 리뷰 ({visibleCount})</option>
        </select>
      </div>
      <ul>
        {filteredReviews.map((item, index) => (
          <li key={`${item.review.reviewSeq}-${index}`}>
            <input
              type="checkbox"
              onChange={() => toggleSelectReview(item.review.reviewSeq)}
              checked={selectedReviews.includes(item.review.reviewSeq)}
            />
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
            <button onClick={() => reviewDeleteBtn(item.review.reviewSeq)}>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminReviewList;
