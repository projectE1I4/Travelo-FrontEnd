import React, { useState, useEffect } from 'react';
import styles from '../../styles/components/TopButton.module.css'; // CSS 파일 import

const TopButton = () => {
  const [showButton, setShowButton] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight); // 창의 높이를 상태로 관리

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const threshold = windowHeight * 0.5; // 높이의 50%를 기준으로 설정
      setShowButton(window.scrollY > threshold);
    };

    const handleResize = () => {
      setWindowHeight(window.innerHeight); // 창 크기가 변경되면 창 높이를 업데이트
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize); // resize 이벤트 리스너 추가

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize); // cleanup 시 resize 이벤트 리스너 제거
    };
  }, [windowHeight]);

  return (
    <>
      {showButton && (
        <div className={styles.topButtonContainer}>
          <button
            className={styles.topButton}
            onClick={scrollToTop}
            type="button"
          >
            Top
          </button>
        </div>
      )}
    </>
  );
};

export default TopButton;
