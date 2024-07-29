import React from 'react';
import styles from '../styles/NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className="grid-container">
      <div className={styles['not-found-container']}>
        <div className={styles['image-wrap']}>
          <img src="/free-sticker-map-11482696.png" alt="404 NOT FOUND" />
        </div>
        <h2>404 - NOT FOUND PAGE</h2>
        <p>이런! 길을 잃어버리셨나요?</p>
        <a href="/">홈으로 돌아가기</a>
      </div>
    </div>
  );
};

export default NotFoundPage;
