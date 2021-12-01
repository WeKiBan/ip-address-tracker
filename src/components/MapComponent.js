import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import locationIcon from '../images/icon-location.svg';

delete L.Icon.Default.prototype._getIconUrl;

const markerIcon = new L.Icon({
  iconUrl: locationIcon,
  iconSize: [50, 60],
  iconAnchor: [20, 60],
  popupAnchor: [0, -20],
});

const MapComponentStyled = styled(MapContainer)`
  width: 100%;
  flex-grow: 1;
`;

const MarkerStyled = styled(Marker)`
  z-index: 1000;
`;

function MapComponent({ geo, IP }) {
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
  }, []);

  const ChangeView = ({ center, zoom }) => {
    const map = useMap();

    map.flyTo(center, zoom);

    return null;
  };
  const position = geo ? [geo.lat, geo.lng] : [29.34664, -38.28196];
  const zoom = geo ? 13 : 5;

  return (
    <MapComponentStyled
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      zoomControl={false}
      dragging={false}
      touchZoom={false}
      doubleClickZoom={false}
      trackResize={true}
    >
      <ChangeView center={position} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerStyled icon={markerIcon} position={position}>
        <Popup>{IP}</Popup>
      </MarkerStyled>
    </MapComponentStyled>
  );
}

export default MapComponent;
