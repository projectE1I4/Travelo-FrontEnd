import React, { useEffect, useState } from 'react';
import { getGroupList, deleteGroup } from '../../services/adminService';

const AdminGroupList = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('latest'); // 기본 정렬값 설정

  const fetchGroups = async (sortOrder) => {
    try {
      const data = await getGroupList(0, sortOrder);
      setGroups(data.content);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups(sortBy);
  }, [sortBy]);

  //그룹 삭제
  const groupDelete = async (courseGroupSeq) => {
    const confirmDelete = window.confirm('그룹을 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        await deleteGroup(courseGroupSeq);
        alert('그룹이 성공적으로 삭제되었습니다.');
        fetchGroups(sortBy); // 삭제 후 그룹 목록 다시 불러오기
      } catch (error) {
        console.error('Error deleting group:', error);
        setError(error);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>전체 그룹</h1>
      <div>
        <button onClick={() => setSortBy('latest')}>최신순</button>
        <button onClick={() => setSortBy('oldest')}>오래된 순</button>
      </div>
      <ul>
        {groups.map((group) => (
          <li key={group.courseGroupSeq}>
            그룹 번호 : {group.courseGroupSeq}, 그룹 제목: {group.title}, 그룹
            생성 일자 : {formatDate(group.createDate)}
            <button onClick={() => groupDelete(group.courseGroupSeq)}>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminGroupList;
