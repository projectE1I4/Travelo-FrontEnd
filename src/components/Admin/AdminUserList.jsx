import React, { useEffect, useState } from 'react';
import { getUserList, deleteUser } from '../../services/adminService';
import { formatDate } from '../common/formatDate';
import '../../css/Admin/AdminUser.css';

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState('latest');
  const [totalCount, setTotalCount] = useState(0);
  const [deletedCount, setDeletedCount] = useState(0);

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

  //로그인 타입 null 데이터 '이메일'로 변경
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

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="adminUserList">
      <h1>전체 회원 목록</h1>
      <div className="sort">
        <button onClick={() => setSortBy('latest')}>최신순</button>
        <button onClick={() => setSortBy('oldest')}>오래된 순</button>
      </div>
      <p>전체 회원 수: {totalCount - deletedCount}</p>
      <p>탈퇴 회원 수: {deletedCount}</p>
      <ul>
        {users.map((user) => (
          <li
            key={user.userSeq}
            className={user.delYn === 'Y' ? 'deleted-user' : ''}
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
                className="delBtn"
                onClick={() => userDelete(user.userSeq, user.username)}
              >
                탈퇴
              </button>
            )}
          </li>
        ))}
      </ul>
      {/* <div>
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 0))}>
          이전 페이지
        </button>
        <button onClick={() => setPage((prev) => prev + 1)}>다음 페이지</button>
      </div> */}
    </div>
  );
};

export default AdminUserList;
