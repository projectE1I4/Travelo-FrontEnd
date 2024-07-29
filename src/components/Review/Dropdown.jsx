import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const DropdownComponent = ({ sortBy, setSortBy }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    sortBy === 'latest' ? '최신순' : '인기순'
  ); // 기본값을 sortBy에 따라 설정

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDropdownClick = (option) => {
    setSelectedOption(option); // 선택된 옵션으로 상태 업데이트
    setSortBy(option === '인기순' ? 'popularity' : 'latest');
    setDropdownOpen(false); // 드롭다운 닫기
  };

  return (
    <div className="dropdown-wrap">
      <div className="dropdown">
        <button onClick={toggleDropdown} className="dropdown-btn">
          {selectedOption} <FontAwesomeIcon icon={faChevronDown} />
        </button>
        {dropdownOpen && (
          <div className="dropdown-content">
            <a onClick={() => handleDropdownClick('인기순')}>인기순</a>
            <a onClick={() => handleDropdownClick('최신순')}>최신순</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownComponent;
