import { useContext } from 'react';
import styles from '../../styles/ListContent.module.css';
import PlaceCard from './PlaceCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { PlaceContext } from '../../contexts/PlaceContext';

const ListContent = () => {
  const { places, loading, error, dropdownTitle, handleDropdownClick } =
    useContext(PlaceContext);

  if (loading) return <span className="loader"></span>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles['list-content']}>
      <div className={styles['dropdown-wrap']}>
        <div className={styles['dropdown']}>
          <div className={styles['dropdown-btn']}>
            {dropdownTitle} <FontAwesomeIcon icon={faChevronDown} />
          </div>
          <div className={styles['dropdown-content']}>
            <a onClick={() => handleDropdownClick('인기순')}>인기순</a>
            <a onClick={() => handleDropdownClick('최신순')}>최신순</a>
          </div>
        </div>
      </div>
      {places.map((place) => (
        <PlaceCard
          key={place.placeSeq}
          image={place.imageFile1}
          type={place.type}
          title={place.title}
          address={place.address}
          views={place.viewCount}
          likes={place.likeCount}
          bookmarks={place.bookmarks || 0}
        />
      ))}
    </div>
  );
};

export default ListContent;
