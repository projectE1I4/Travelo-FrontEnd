import { useContext } from 'react';
import styles from '../../styles/components/Pagination.module.css';
import { BrowseContext } from '../../contexts/BrowseContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ totalPages }) => {
  const { currentPage, setCurrentPage } = useContext(BrowseContext);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handlePrevClick = () => {
    const startPage = Math.floor(currentPage / 5) * 5;
    if (startPage > 0) {
      setCurrentPage(startPage - 1);
    }
  };

  const handleNextClick = () => {
    const startPage = Math.floor(currentPage / 5) * 5;
    if (startPage + 5 < totalPages) {
      setCurrentPage(startPage + 5);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const startPage = Math.floor(currentPage / maxPagesToShow) * maxPagesToShow;
    const endPage = Math.min(startPage + maxPagesToShow, totalPages);

    for (let i = startPage; i < endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className={styles.pagination}>
      <button
        className={currentPage === 0 ? styles.disabled : ''}
        onClick={handlePrevClick}
        disabled={currentPage === 0}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      {getPageNumbers().map((page) => (
        <button
          key={page}
          className={currentPage === page ? styles.active : ''}
          onClick={() => handlePageClick(page)}
        >
          {page + 1}
        </button>
      ))}
      <button
        className={currentPage >= totalPages - 1 ? styles.disabled : ''}
        onClick={handleNextClick}
        disabled={currentPage >= totalPages - 1}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default Pagination;
