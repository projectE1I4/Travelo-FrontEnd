import React, { useState, useEffect } from 'react';
import styles from '../../styles/components/TopButton.module.css'; // CSS 파일 import

const TopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const ShowButtonClick = () => {
      const halfWindowHeight = window.innerHeight / 2; // 창 높이의 절반을 계산합니다.
      if (window.scrollY > halfWindowHeight) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener('scroll', ShowButtonClick);
    return () => {
      window.removeEventListener('scroll', ShowButtonClick);
    };
  }, []);

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
