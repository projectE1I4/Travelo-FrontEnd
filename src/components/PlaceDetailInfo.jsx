import styles from '../styles/components/place/PlaceDetailInfo.module.css';
import PlaceDetailCard from './PlaceDetailCard';

const renderDetailItem = (label, value) => {
  if (!value || value === '0' || value === '없음') {
    return null;
  }

  const unifiedValue = value.replace(/<br\s*\/?>/gi, ', ');
  return (
    <li className={styles['info-list-item']}>
      <strong>{label}</strong>
      <p>{unifiedValue}</p>
    </li>
  );
};

const PlaceDetailInfo = ({ type, details }) => {
  if (!details) return null;

  return (
    <div className={styles['info-wrap']}>
      <h2>상세정보</h2>
      <ul className={styles['info-list']}>
        {type === '12' && (
          <>
            {renderDetailItem('수용인원', details.accomcount)}
            {renderDetailItem('체험가능연령', details.expagerange)}
            {renderDetailItem('체험안내', details.expguide)}
            {renderDetailItem('세계문화유산유무', details.heritage1)}
            {renderDetailItem('세계자연유산유무', details.heritage2)}
            {renderDetailItem('세계기록유산유무', details.heritage3)}
            {renderDetailItem('문의및안내', details.infocenter)}
            {renderDetailItem('개장일', details.opendate)}
            {renderDetailItem('쉬는날', details.restdate)}
            {renderDetailItem('이용시기', details.useseason)}
            {renderDetailItem('이용시간', details.usetime)}
          </>
        )}
        {type === '14' && (
          <>
            {renderDetailItem('할인정보', details.discountinfo)}
            {renderDetailItem('문의및안내', details.infocenterculture)}
            {renderDetailItem('주차요금', details.parkingfee)}
            {renderDetailItem('쉬는날', details.restdateculture)}
            {renderDetailItem('이용요금', details.usefee)}
            {renderDetailItem('이용시간', details.usetimeculture)}
            {renderDetailItem('규모', details.scale)}
            {renderDetailItem('관람소요시간', details.spendtime)}
          </>
        )}
        {type === '28' && (
          <>
            {renderDetailItem('수용인원', details.accomcountleports)}
            {renderDetailItem('체험가능연령', details.expagerangeleports)}
            {renderDetailItem('문의및안내', details.infocenterleports)}
            {renderDetailItem('개장기간', details.openperiod)}
            {renderDetailItem('주차요금', details.parkingfeeleports)}
            {/* {renderDetailItem('예약안내', details.reservation)} */}
            {renderDetailItem('쉬는날', details.restdateleports)}
            {renderDetailItem('규모', details.scaleleports)}
            {renderDetailItem('입장료', details.usefeeleports)}
            {renderDetailItem('이용시간', details.usetimeleports)}
          </>
        )}
        {type === '32' && (
          <>
            {renderDetailItem('수용가능인원', details.accomcountlodging)}
            {/* {renderDetailItem('베니키아여부', details.benikia)} */}
            {renderDetailItem('입실시간', details.checkintime)}
            {renderDetailItem('퇴실시간', details.checkouttime)}
            {renderDetailItem('식음료장', details.foodplace)}
            {renderDetailItem('객실내취사', details.chkcooking)}
            {/* {renderDetailItem('굿스테이여부', details.goodstay)} */}
            {renderDetailItem('한옥여부', details.hanok)}
            {renderDetailItem('문의및안내', details.infocenterlodging)}
            {renderDetailItem('객실수', details.roomcount)}
            {/* {renderDetailItem('예약안내', details.reservationlodging)} */}
            {/* {renderDetailItem('예약안내홈페이지', details.reservationurl)} */}
            {renderDetailItem('객실유형', details.roomtype)}
            {renderDetailItem('규모', details.scalelodging)}
            {renderDetailItem('부대시설 (기타)', details.subfacility)}
            {renderDetailItem('환불규정', details.refundregulation)}
          </>
        )}
        {type === '38' && (
          <>
            {renderDetailItem('문화센터바로가기', details.culturecenter)}
            {renderDetailItem('장서는날', details.fairday)}
            {renderDetailItem('문의및안내', details.infocentershopping)}
            {renderDetailItem('개장일', details.opendateshopping)}
            {renderDetailItem('영업시간', details.opentime)}
            {renderDetailItem('쉬는날', details.restdateshopping)}
            {renderDetailItem('판매품목', details.saleitem)}
            {renderDetailItem('판매품목별가격', details.saleitemcost)}
            {renderDetailItem('규모', details.scaleshopping)}
            {renderDetailItem('매장안내', details.shopguide)}
          </>
        )}
        {type === '39' && (
          <>
            {renderDetailItem('할인정보', details.discountinfofood)}
            {renderDetailItem('대표메뉴', details.firstmenu)}
            {renderDetailItem('문의및안내', details.infocenterfood)}
            {renderDetailItem('개업일', details.opendatefood)}
            {renderDetailItem('영업시간', details.opentimefood)}
            {renderDetailItem('포장가능', details.packing)}
            {/* {renderDetailItem('예약안내', details.reservationfood)} */}
            {renderDetailItem('쉬는날', details.restdatefood)}
            {renderDetailItem('규모', details.scalefood)}
            {renderDetailItem('좌석수', details.seat)}
            {renderDetailItem('취급메뉴', details.treatmenu)}
            {renderDetailItem('인허가번호', details.lcnsno)}
          </>
        )}
      </ul>
      <PlaceDetailCard details={details} type={type} />
    </div>
  );
};

export default PlaceDetailInfo;
