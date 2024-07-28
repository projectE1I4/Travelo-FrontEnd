import { useState, useContext } from 'react';
import styles from '../../styles/components/browseCourses/Sidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRotateRight,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { BrowseContext } from '../../contexts/BrowseContext';

const Sidebar = () => {
  const [isRegionExpanded, setIsRegionExpanded] = useState(false);
  const [isProvinceExpanded, setIsProvinceExpanded] = useState(false);
  const { resetFilters, updateFilters } = useContext(BrowseContext);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const toggleRegion = () => setIsRegionExpanded(!isRegionExpanded);
  const toggleProvince = () => setIsProvinceExpanded(!isProvinceExpanded);

  const handleRegionRadioChange = (e) => {
    setSelectedRegion(e.target.value);
    updateFilters({ areaCode: e.target.value });
  };

  const handleTypeRadioChange = (e) => {
    setSelectedType(e.target.value);
    updateFilters({ type: e.target.value });
  };

  const handleReset = () => {
    setSelectedRegion('');
    setSelectedType('');
    resetFilters();
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.heading}>
        <h3>코스 둘러보기</h3>
        <button onClick={handleReset}>
          <FontAwesomeIcon icon={faRotateRight} />
          초기화
        </button>
      </div>
      <div className={styles.section}>
        <h4>지역</h4>
        <div className={styles['section-content']}>
          <label>
            <input
              type="radio"
              name="region"
              value=""
              checked={selectedRegion === ''}
              onChange={handleRegionRadioChange}
            />
            <span></span> 전체
          </label>
        </div>
        <div className={styles['section-header']} onClick={toggleRegion}>
          <span>서울특별시,광역시,특별자치시</span>
          <FontAwesomeIcon
            icon={isRegionExpanded ? faChevronUp : faChevronDown}
          />
        </div>
        {isRegionExpanded && (
          <div className={styles['section-content']}>
            {['1', '6', '4', '2', '5', '3', '7', '8'].map((code) => (
              <label key={code}>
                <input
                  type="radio"
                  name="region"
                  value={code}
                  checked={selectedRegion === code}
                  onChange={handleRegionRadioChange}
                />
                <span></span> {getRegionName(code)}
              </label>
            ))}
          </div>
        )}
        <div className={styles['section-header']} onClick={toggleProvince}>
          <span>특별자치도, 도</span>
          <FontAwesomeIcon
            icon={isProvinceExpanded ? faChevronUp : faChevronDown}
          />
        </div>
        {isProvinceExpanded && (
          <div className={styles['section-content']}>
            {['31', '32', '33', '34', '37', '38', '35', '36', '39'].map(
              (code) => (
                <label key={code}>
                  <input
                    type="radio"
                    name="region"
                    value={code}
                    checked={selectedRegion === code}
                    onChange={handleRegionRadioChange}
                  />
                  <span></span> {getProvinceName(code)}
                </label>
              )
            )}
          </div>
        )}
      </div>
      <div className={styles.section}>
        <div className={styles['section-header']}>
          <span>유형</span>
        </div>
        <div className={styles['section-content']}>
          {['', '12', '14', '28', '32', '38', '39'].map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="type"
                value={type}
                checked={selectedType === type}
                onChange={handleTypeRadioChange}
              />
              <span></span> {getTypeName(type)}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

const getRegionName = (code) => {
  const regionNames = {
    1: '서울특별시',
    2: '인천광역시',
    3: '대전광역시',
    4: '대구광역시',
    5: '광주광역시',
    6: '부산광역시',
    7: '울산광역시',
    8: '세종특별자치시',
  };
  return regionNames[code];
};

const getProvinceName = (code) => {
  const provinceNames = {
    31: '경기도',
    32: '강원특별자치도',
    33: '충청북도',
    34: '충청남도',
    35: '경상북도',
    36: '경상남도',
    37: '전북특별자치도',
    38: '전라남도',
    39: '제주특별자치도',
  };
  return provinceNames[code];
};

const getTypeName = (type) => {
  const typeNames = {
    '': '전체',
    12: '관광지',
    14: '문화시설',
    28: '레저 스포츠',
    32: '숙박',
    38: '쇼핑',
    39: '음식점',
  };
  return typeNames[type];
};

export default Sidebar;
