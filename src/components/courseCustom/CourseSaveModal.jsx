import React, { useState, useEffect } from 'react';
import { useCourse } from '../../contexts/CourseContext';
import axiosInstance from '../../utils/axiosInstance';
import styles from '../../styles/components/courseCustom/CourseSaveModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';

const CourseSaveModal = ({ onClose }) => {
  const { selectedPlaces, selectedRegion } = useCourse();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [privateYn, setPrivateYn] = useState('N'); // 기본값을 비공개로 설정

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
      onClose();
    } catch (error) {
      console.error('코스 저장 실패:', error);
    }
  };

  const togglePrivacy = () => {
    setPrivateYn(privateYn === 'N' ? 'Y' : 'N');
  };

  return (
    <div className={styles['modal']}>
      <div className={styles['modalContent']}>
        <h2>코스 저장</h2>
        <label>
          제목:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          설명:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <div className={styles['toggle-container']}>
          <span className={styles['toggle-label']}>
            공개 여부: {privateYn === 'N' ? '비공개' : '공개'}
          </span>
          <FontAwesomeIcon
            icon={privateYn === 'N' ? faToggleOff : faToggleOn}
            onClick={togglePrivacy}
            className={styles['toggle-icon']}
            size="2x"
          />
        </div>
        <button onClick={handleSave}>저장</button>
        <button onClick={onClose}>취소</button>
      </div>
    </div>
  );
};

export default CourseSaveModal;
