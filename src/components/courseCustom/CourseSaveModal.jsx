import React, { useState, useEffect } from 'react';
import { useCourse } from '../../contexts/CourseContext';
import axiosInstance from '../../utils/axiosInstance';
import styles from '../../styles/components/courseCustom/CourseSaveModal.module.css';

const CourseSaveModal = ({ onClose }) => {
  const { selectedPlaces, selectedRegion } = useCourse();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [privateYn, setPrivateYn] = useState('Y'); // 기본값을 비공개로 설정

  useEffect(() => {
    // 모달이 열릴 때 body에 overflow: hidden; 스타일을 추가
    document.body.style.overflow = 'hidden';

    // 모달이 닫힐 때 overflow: hidden; 스타일을 제거
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSave = async () => {
    const placeSeqs = selectedPlaces.map((place) => place.placeSeq);
    const accessToken = sessionStorage.getItem('accessToken'); // 세션 스토리지에서 토큰 가져오기

    const data = {
      title,
      description,
      privateYn,
      placeSeqs,
      areaCode: selectedRegion,
    };

    try {
      const response = await axiosInstance.post('/user/custom/create', data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('코스 저장 성공:', response.data);
      alert('코스 저장이 완료되었습니다');
      onClose();
    } catch (error) {
      console.error('코스 저장 실패:', error);
    }
  };

  const togglePrivacy = () => {
    setPrivateYn(privateYn === 'N' ? 'Y' : 'N');
  };

  return (
    <div className={styles.modal}>
      <div className={styles['modal-content']}>
        <h2>코스 커스텀 저장</h2>
        <div className={styles['form-group']}>
          <label className={styles.label}>코스제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="코스 제목을 입력해주세요"
            className={styles.input}
          />
        </div>
        <div className={styles['form-group']}>
          <label className={styles.label}>설명(선택사항)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="코스 설명을 입력해주세요"
            className={styles.textarea}
          />
        </div>

        <div className={styles['toggle-container']}>
          <span className={styles['toggle-label']}>코스 공개하기</span>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={privateYn === 'N'}
              onChange={togglePrivacy}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
        <div className={styles['btn-wrap']}>
          <button onClick={handleSave} className={styles['save-button']}>
            저장하기
          </button>
          <button onClick={onClose} className={styles['cancel-button']}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseSaveModal;
