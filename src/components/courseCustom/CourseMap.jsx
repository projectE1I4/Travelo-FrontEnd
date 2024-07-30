import React, { useEffect, useRef } from 'react';
import { useCourse } from '../../contexts/CourseContext';
import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk';

const CourseMap = () => {
  const { mapCenter, selectedPlaces } = useCourse();
  const mapRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) {
        mapRef.current.relayout();
        mapRef.current.setCenter(
          new window.kakao.maps.LatLng(mapCenter.lat, mapCenter.lng)
        );
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mapCenter]);

  return (
    <Map
      center={{ lat: mapCenter.lat, lng: mapCenter.lng }}
      style={{ width: '100%', height: '100%' }}
      level={8}
      ref={mapRef}
    >
      {selectedPlaces.map((place, index) => (
        <CustomOverlayMap
          key={place.placeSeq}
          position={{ lat: place.latitude, lng: place.longitude }}
          yAnchor={1.5}
        >
          <div
            style={{
              position: 'relative',
              width: '30px', // Adjust size as needed
              height: '30px', // Adjust size as needed
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              style={{
                width: '100%',
                height: '100%',
                fill: '#ff4040',
              }}
            >
              <path d="M384 192c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192z" />
            </svg>
            <div
              style={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                fontWeight: '500',
                fontSize: '12px',
              }}
            >
              {index + 1}
            </div>
          </div>
        </CustomOverlayMap>
      ))}
    </Map>
  );
};

export default CourseMap;
