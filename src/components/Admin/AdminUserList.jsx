import React, { useEffect, useState } from 'react';
import {
  getUserList,
  deleteUser,
  deleteUsers,
} from '../../services/adminService';
import { formatDate } from '../common/formatDate';
import { useNavigate } from 'react-router-dom';
import '../../css/Admin/AdminUser.css';

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState('latest');
  const [totalCount, setTotalCount] = useState(0);
  const [deletedCount, setDeletedCount] = useState(0);
  const [filter, setFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]); // 회원 선택
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUserList(page, sortBy);
        setUsers(data.content);
        setTotalCount(data.totalElements);

        // 탈퇴 회원 수 계산
        const deletedUsers = data.content.filter((user) => user.delYn === 'Y');
        setDeletedCount(deletedUsers.length);
      } catch (err) {
        setError(err);
      }
    };
    fetchUsers();
  }, [page, sortBy]);

  // 로그인 타입 null 데이터 '이메일'로 변경
  const getLoginType = (oauthType) => {
    switch (oauthType) {
      case 'google':
        return '구글';
      case 'kakao':
        return '카카오';
      case 'naver':
        return '네이버';
      default:
        return '이메일';
    }
  };

  // 회원 탈퇴
  const userDelete = async (userSeq, username) => {
    const confirmDelete = window.confirm(
      `${username} 회원을 탈퇴시키겠습니까?`
    );
    if (confirmDelete) {
      try {
        await deleteUser(userSeq);
        alert('회원을 탈퇴시켰습니다.');
        setUsers(users.filter((user) => user.userSeq !== userSeq));

        // 탈퇴 회원 수 업데이트
        setDeletedCount(deletedCount + 1);
      } catch (error) {
        alert('회원 탈퇴에 실패하였습니다.');
        console.error('Error deleting user:', error);
      }
    }
  };

  // 선택된 회원 탈퇴
  const selectDelete = async () => {
    if (selectedUsers.length === 0) {
      alert('탈퇴시킬 회원을 선택해주세요.');
      return;
    }

    const confirmDelete = window.confirm(
      `${selectedUsers.length}명의 회원을 탈퇴시키겠습니까?`
    );
    if (confirmDelete) {
      try {
        await deleteUsers(selectedUsers);
        alert('선택된 회원들을 탈퇴시켰습니다.');
        setUsers(users.filter((user) => !selectedUsers.includes(user.userSeq)));
        setSelectedUsers([]); // 선택 목록 초기화

        // 탈퇴 회원 수 업데이트
        setDeletedCount(deletedCount + selectedUsers.length);
      } catch (error) {
        alert('회원 탈퇴에 실패하였습니다.');
        console.error('Error deleting users:', error);
      }
    }
  };

  // 선택된 회원 변경
  const toggleSelectUser = (userSeq) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userSeq)
        ? prevSelected.filter((seq) => seq !== userSeq)
        : [...prevSelected, userSeq]
    );
  };

  // 필터링된 사용자 목록
  const filterUsers = users.filter((user) => {
    if (filter === 'all') return true;
    return filter === 'deleted' ? user.delYn === 'Y' : user.delYn === 'N';
  });

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="adminUserList">
      <h1>전체 회원 목록</h1>
      <div className="filtering">
        <div className="filter">
          <button onClick={() => setFilter('all')}>전체</button>
          <button onClick={() => setFilter('active')}>활성 회원</button>
          <button onClick={() => setFilter('deleted')}>탈퇴 회원</button>
        </div>
        <div className="sort">
          <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
            <option value="latest">최신순</option>
            <option value="oldest">오래된 순</option>
          </select>
        </div>
      </div>
      <p>전체 회원 수: {totalCount}</p>
      <p>활성 회원 수: {totalCount - deletedCount}</p>
      <p>탈퇴 회원 수: {deletedCount}</p>
      <p>선택된 회원: {selectedUsers.length}</p>
      <button onClick={selectDelete}>선택된 회원 탈퇴</button>
      <ul>
        {filterUsers.map((user) => (
          <div className="userItem" key={user.userSeq}>
            <input
              type="checkbox"
              onChange={(e) => {
                e.stopPropagation();
                toggleSelectUser(user.userSeq);
              }}
              checked={selectedUsers.includes(user.userSeq)}
            />
            <li
              className={user.delYn === 'Y' ? 'deleted-user' : ''}
              onClick={() => navigate(`/admin/userDetail/${user.userSeq}`)}
            >
              순차번호: {user.userSeq}
              <br />
              이메일: {user.username}
              <br />
              로그인 타입: {getLoginType(user.oauthType)}
              <br />
              가입일: {formatDate(user.registerDate)}
              <br />
              {user.delYn === 'Y' ? (
                <span className="deleted">탈퇴 회원</span>
              ) : (
                <button
                  className="delBtn btn_type_1"
                  onClick={(e) => {
                    e.stopPropagation();
                    userDelete(user.userSeq, user.username);
                  }}
                >
                  탈퇴
                </button>
              )}
            </li>
          </div>
        ))}
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

export default AdminUserList;
