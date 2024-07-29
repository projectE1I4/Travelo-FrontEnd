import React, { useEffect, useState } from 'react';
import { getAdminData } from '../../services/adminService';
import { Link } from 'react-router-dom';

const AdminMain = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAdminData();
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Admin Main Page</h1>
      <Link to="/admin/users">
        <button>전체 회원 : {data['user count']}</button>
      </Link>
      <br />
      <Link to="/admin/groups">
        <button>전체 그룹 : {data['group count']}</button>
      </Link>
      <br />
      <Link to="/admin/courses">
        <button>전체 코스 : {data['course count']}</button>
      </Link>
      <br />
      <Link to="/admin/reviews">
        <button>전체 리뷰 : {data['review count']}</button>
      </Link>
      <br />
      <Link to="/admin/blindReviews">
        <button>신고 리뷰 : {data['reported5plus count']}</button>
      </Link>
    </div>
  );
};

export default AdminMain;
