import { useParams, useLocation } from 'react-router-dom';
import usePlaceDetails from '../../hooks/usePlaceDetails';
import LoadingError from '../../components/common/LoadingError';
import PlaceDetailInfo from '../../components/PlaceDetailInfo';
import MapComponent from '../../components/common/MapComponent';
import styles from '../../styles/pages/Place/PlaceDetail.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

const PlacesDetailPage = () => {
  const { placeSeq } = useParams();
  const location = useLocation();
  const {
    type,
    contentId,
    image,
    title,
    address,
    views,
    likes,
    bookmarks,
    typeText,
    typeMap,
    longitude,
    latitude,
  } = location.state || {};

  const { placeDetails, loading, error } = usePlaceDetails(
    contentId,
    type,
    placeSeq
  );

  return (
    <div className="grid-container">
      <div className={styles['place-detail']}>
        <section className={styles['image-map-section']}>
          <div className={styles['map-container']}>
            <MapComponent latitude={latitude} longitude={longitude} />
          </div>
          <div className={styles['image-container']}>
            {image ? (
              <img src={image} alt={title} className={styles.image} />
            ) : (
              <div className={styles['image-placeholder']}>
                <FontAwesomeIcon icon={faImage} size="6x" color="#ccc" />
              </div>
            )}
          </div>
        </section>
        {/* 제목, 주소, 유형 */}
        <section className={styles['header-section']}>
          <span>{typeText}</span>
          <h1>{title}</h1>
          <p>{address}</p>
          {/* <p>장소고유번호: {placeSeq}</p>
          <p>컨텐츠아이디: {contentId}</p> */}
        </section>
        <LoadingError loading={loading} error={error} />
        {placeDetails && <PlaceDetailInfo type={type} details={placeDetails} />}
      </div>
    </div>
  );
};

export default PlacesDetailPage;
