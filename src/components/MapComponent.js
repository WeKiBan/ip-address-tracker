import React from 'react';
import styled from 'styled-components';
import L from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from 'react-leaflet';
import locationIcon from '../images/icon-location.svg';

delete L.Icon.Default.prototype._getIconUrl;

const markerIcon = new L.Icon({
  iconUrl: locationIcon,
  iconSize: [50, 60],
  popupAnchor: [0, -20]
});

const MapComponentStyled = styled(MapContainer)`
  width: 100vw;
  height: 65vh;
`;

function MapComponent({ position, IP }) {
  return (
    <MapComponentStyled
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright" />
      <Marker icon={markerIcon} position={position}>
        <Popup>{IP}</Popup>
      </Marker>
    </MapComponentStyled>
  );
}

export default MapComponent;
