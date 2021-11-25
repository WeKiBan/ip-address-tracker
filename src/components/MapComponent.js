import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import L from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  ZoomControl,
} from 'react-leaflet';
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

function MapComponent({ position, IP }) {
  const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.flyTo(center, zoom);
    return null;
  };

  return (
    <MapComponentStyled
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      zoomControl={false}
      dragging={true}
      touchZoom={true}
      doubleClickZoom={false}
      trackResize={true}
    >
      <ZoomControl position="bottomright"  />
      <ChangeView center={position} zoom={13} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={markerIcon} position={position}>
        <Popup>{IP}</Popup>
      </Marker>
      <Marker icon={markerIcon} position={position}>
        <Popup>{IP}</Popup>
      </Marker>
    </MapComponentStyled>
  );
}

export default MapComponent;
