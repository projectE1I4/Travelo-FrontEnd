import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import KakaoLoginButton from '../../components/SocialAuth/KakaoLoginButton';
import GoogleLoginButton from '../../components/SocialAuth/GoogleLoginButton';
import NaverLoginButton from '../../components/SocialAuth/NaverLoginButton';

const AccountIntergrationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [presentAccount, setPresentAccount] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (location.state && location.state.provider && location.state.username) {
      setPresentAccount(location.state.provider);
      setUsername(location.state.username);
    } else {
      navigate('/');
    }
  }, [location, navigate]);

  return (
    <div>
      <h1>계정 통합</h1>
      <p>{username} 이메일을 사용하는 계정이 이미 존재합니다.</p>
      {presentAccount === 'kakao' && <KakaoLoginButton />}
      {presentAccount === 'google' && <GoogleLoginButton />}
      {presentAccount === 'naver' && <NaverLoginButton />}
    </div>
  );
};

export default AccountIntergrationPage;
