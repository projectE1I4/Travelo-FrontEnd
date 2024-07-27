import React, { useEffect, useRef } from 'react';
import { useCourse } from '../../contexts/CourseContext';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const CourseMap = () => {
  const { selectedRegion, regions } = useCourse();
  const mapRef = useRef();

  const region = regions.find((region) => region.code === selectedRegion);
  const latitude = region ? region.lat : 37.5665;
  const longitude = region ? region.lng : 126.978;

  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) {
        mapRef.current.relayout();
        mapRef.current.setCenter(
          new window.kakao.maps.LatLng(latitude, longitude)
        );
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [latitude, longitude]);

  return (
    <Map
      center={{ lat: latitude, lng: longitude }}
      style={{ width: '100%', height: '100%' }}
      level={7}
      ref={mapRef}
    >
      <MapMarker position={{ lat: latitude, lng: longitude }} />
    </Map>
  );
};

export default CourseMap;
