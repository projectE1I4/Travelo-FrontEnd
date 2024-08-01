import { useEffect, useRef } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const MapComponent = ({ latitude, longitude }) => {
  const mapRef = useRef();

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
      level={1}
      ref={mapRef}
    >
      <MapMarker position={{ lat: latitude, lng: longitude }} />
    </Map>
  );
};

export default MapComponent;
