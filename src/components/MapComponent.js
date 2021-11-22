import React from 'react';
import styled from 'styled-components';
import mapImg from '../images/GoogleMapTA.jpeg';

const MapComponentStyled = styled.div`
  background: url(${mapImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 65vh;
  min-height: 250px;
`;

function MapComponent() {
  return <MapComponentStyled></MapComponentStyled>;
}

export default MapComponent;
