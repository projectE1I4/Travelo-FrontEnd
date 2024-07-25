import React, { useEffect, useState } from 'react';
import { getAdminData } from '../../services/adminService';

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
      <p>전체 회원 : {data['user count']}</p>
      <p>전체 그룹 : {data['group count']}</p>
      <p>전체 코스 : {data['course count']}</p>
      <p>전체 리뷰 : {data['review count']}</p>
      <p>신고 리뷰 : {data['reported5plus count']}</p>
    </div>
  );
};

export default AdminMain;
