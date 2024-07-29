import React, { useEffect, useState } from 'react';
import {
  getGroupList,
  deleteGroup,
  deleteGroups,
} from '../../services/adminService';
import { formatDate } from '../common/formatDate.jsx';
import '../../css/Admin/AdminGroup.css';

const AdminGroupList = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
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

  // 여러 그룹 삭제
  const deleteSelectedGroups = async () => {
    if (selectedGroups.length === 0) {
      alert('삭제할 그룹을 선택하세요.');
      return;
    }
    const confirmDelete = window.confirm('선택한 그룹을 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        await deleteGroups(selectedGroups);
        alert('선택한 그룹이 성공적으로 삭제되었습니다.');
        fetchGroups(sortBy); // 삭제 후 그룹 목록 다시 불러오기
        setSelectedGroups([]);
      } catch (error) {
        console.error('Error deleting groups:', error);
        setError(error);
      }
    }
  };

  const toggleSelectGroup = (courseGroupSeq) => {
    setSelectedGroups((prevSelected) =>
      prevSelected.includes(courseGroupSeq)
        ? prevSelected.filter((seq) => seq !== courseGroupSeq)
        : [...prevSelected, courseGroupSeq]
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="adminGroupList">
      <h1>전체 그룹</h1>
      <div className="sort">
        <button onClick={() => setSortBy('latest')}>최신순</button>
        <button onClick={() => setSortBy('oldest')}>오래된 순</button>
      </div>
      <button onClick={deleteSelectedGroups}>선택한 그룹 삭제</button>
      <ul>
        {groups.map((group) => (
          <li key={group.courseGroupSeq}>
            <input
              type="checkbox"
              onChange={() => toggleSelectGroup(group.courseGroupSeq)}
              checked={selectedGroups.includes(group.courseGroupSeq)}
            />
            <span>그룹 번호 : {group.courseGroupSeq}</span>
            <span>그룹 제목: {group.title}</span>
            <span>그룹 생성 일자 : {formatDate(group.createDate)}</span>
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
