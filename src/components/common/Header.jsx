import { Link } from 'react-router-dom';
import styles from '../../styles/components/Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faSignsPost,
  faLightbulb,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../hooks/useAuth';

function Header() {
  const { isAuthenticated, user } = useAuth();
  return (
    <header className={styles['header']}>
      <nav className={`navbar ${styles['navbar-custom']}`}>
        <Link className={`navbar-brand ${styles['navbar-brand']}`} to="/">
          travelo
        </Link>
        <div className={styles['navbar-nav']}>
          <ul className={`navbar-nav ${styles['navbar-ul']}`}>
            <li className={`nav-item ${styles['nav-item']}`}>
              <Link
                className={`nav-link ${styles['nav-link']} ${styles['nav-link-icon']}`}
                to="/places"
              >
                <FontAwesomeIcon icon={faLocationDot} /> 장소 검색
              </Link>
            </li>
            <li className={`nav-item ${styles['nav-item']}`}>
              <Link
                className={`nav-link ${styles['nav-link']} ${styles['nav-link-icon']}`}
                to="/custom-course"
              >
                <FontAwesomeIcon icon={faSignsPost} /> 코스 커스텀
              </Link>
            </li>
            <li className={`nav-item ${styles['nav-item']}`}>
              <Link
                className={`nav-link ${styles['nav-link']} ${styles['nav-link-icon']}`}
                to="/browse-courses"
              >
                <FontAwesomeIcon icon={faLightbulb} /> 코스 둘러보기
              </Link>
            </li>
          </ul>
        </div>
        {isAuthenticated && user ? (
          <button type="button" className={styles['btn-custom']}>
            {user.role === 'ADMIN' ? (
              <Link to="/admin">어드민 페이지</Link>
            ) : (
              <Link to="/users/mypage">마이 페이지</Link>
            )}
          </button>
        ) : (
          <button type="button" className={styles['btn-custom']}>
            <Link to="/users/login">로그인 / 회원가입</Link>
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
