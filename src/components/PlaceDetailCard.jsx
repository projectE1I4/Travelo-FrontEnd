import styles from '../styles/components/place/PlaceDetailCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquareParking,
  faTruckPickup,
  faBabyCarriage,
  faPaw,
  faCreditCard,
  faEye,
  faBicycle,
  faCampground,
  faFire,
  faDumbbell,
  faMusic,
  faShower,
  faDesktop,
  faHotTub,
  faRestroom,
  faChalkboardTeacher,
  faFutbol,
  faChild,
  faUtensils,
  faSmokingBan,
} from '@fortawesome/free-solid-svg-icons';

const iconMap = {
  주차: faSquareParking,
  유모차대여: faBabyCarriage,
  '반려동물 동반': faPaw,
  '신용카드 결제': faCreditCard,
  픽업서비스: faTruckPickup,
  바비큐장: faFire,
  뷰티시설: faEye,
  식음료장: faUtensils,
  화장실: faRestroom,
  '자전거 대여 서비스': faBicycle,
  캠프파이어: faCampground,
  휘트니스센터: faDumbbell,
  노래방: faMusic,
  공용샤워실: faShower,
  공용PC실: faDesktop,
  사우나실: faHotTub,
  세미나실: faChalkboardTeacher,
  스포츠시설: faFutbol,
  어린이놀이방여부: faChild,
  포장가능: faUtensils,
  '금연/흡연여부': faSmokingBan,
};

const renderCardItem = (label, value) => {
  if (!value || value === '0' || value === '없음') {
    return null;
  } else if (value === '1') {
    value = '있음';
  }
  const unifiedValue = value.replace(/<br\s*\/?>/gi, ', ');

  return (
    <div className={styles['card-item']}>
      <FontAwesomeIcon
        icon={iconMap[label]}
        size="3x"
        className={styles['icon']}
      />
      <div className={styles['card-label']}>{label}</div>
      <div className={styles['card-value']}>{unifiedValue}</div>
    </div>
  );
};

const PlaceDetailCard = ({ details, type }) => {
  const getField = (fields) => {
    for (let field of fields) {
      if (details[field]) return details[field];
    }
    return null;
  };

  return (
    <div className={styles['card-wrap']}>
      {renderCardItem(
        '주차',
        getField([
          'parking',
          'parkingshopping',
          'parkinglodging',
          'parkingfood',
        ])
      )}
      {renderCardItem(
        '유모차대여',
        getField([
          'chkbabycarriage',
          'chkbabycarriageculture',
          'chkbabycarriageshopping',
          'chkbabycarriageleports',
        ])
      )}
      {renderCardItem(
        '반려동물 동반',
        getField(['chkpet', 'chkpetculture', 'chkpetshopping', 'chkpetleports'])
      )}
      {renderCardItem(
        '신용카드 결제',
        getField([
          'chkcreditcard',
          'chkcreditcardculture',
          'chkcreditcardshopping',
          'chkcreditcardfood',
          'chkcreditcardleports',
        ])
      )}
      {type === '32' && (
        <>
          {renderCardItem('픽업서비스', details.pickup)}
          {renderCardItem('바비큐장', details.barbecue)}
          {renderCardItem('뷰티시설', details.beauty)}
          {renderCardItem('식음료장', details.beverage)}
          {renderCardItem('자전거 대여 서비스', details.bicycle)}
          {renderCardItem('캠프파이어', details.campfire)}
          {renderCardItem('휘트니스센터', details.fitness)}
          {renderCardItem('노래방', details.karaoke)}
          {renderCardItem('공용샤워실', details.publicbath)}
          {renderCardItem('공용PC실', details.publicpc)}
          {renderCardItem('사우나실', details.sauna)}
          {renderCardItem('세미나실', details.seminar)}
          {renderCardItem('스포츠시설', details.sports)}
        </>
      )}
      {type === '38' && <>{renderCardItem('화장실', details.restroom)}</>}

      {type === '39' && (
        <>
          {renderCardItem('어린이놀이방여부', details.kidsfacility)}
          {renderCardItem('포장가능', details.packing)}
          {renderCardItem('금연/흡연여부', details.smoking)}
        </>
      )}
    </div>
  );
};

export default PlaceDetailCard;
