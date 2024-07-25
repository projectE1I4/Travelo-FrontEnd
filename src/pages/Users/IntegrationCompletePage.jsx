import React from 'react';
import { useNavigate } from 'react-router-dom';

const IntegrationCompletePage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/home');
  };

  return (
    <div>
      <h1>통합 완료</h1>
      <p>계정 통합이 완료되었습니다.</p>
      <button onClick={handleGoHome}>홈 페이지로 이동</button>
    </div>
  );
};

export default IntegrationCompletePage;
