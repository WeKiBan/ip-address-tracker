import React from 'react';
import styled from 'styled-components';
import backgroundImg from '../images/pattern-bg.png';
import { FaChevronRight } from 'react-icons/fa';

const HeaderComponentStyled = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: url(${backgroundImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 200px;
  height: 35vh;
`;

const Header = styled.h1`
  font-size: 25px;
  margin: 25px 0;
  color: #fff;
  font-weight: 400;
`;

const InputContainer = styled.div`
  display: flex;
  width: 85%;
  border-radius: 10px;
  margin-bottom: 25px;
  min-height: 60px;
  overflow: hidden;
`;

const Input = styled.input`
  flex-grow: 1;
  height: 60px;
  border: none;
  font-size: 18px;
  padding-left: 20px;
  padding-right: 20px;
  font-weight: 300;
`;

const Button = styled.button`
  height: 60px;
  width: 60px;
  border: none;
  background: hsl(0, 0%, 17%);
`;

const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 22px;
  background: #fff;
  width: 85%;
  border-radius: 10px;
  padding: 25px;
`;

const Info = styled.div`
  text-align: center;
  width: 100%;
  h3 {
    text-transform: uppercase;
    color: hsl(0, 0%, 59%);
    font-size: 10px;
    margin-bottom: 5px;
    font-weight: 500;
    letter-spacing: 1px;
  }
  p {
    font-size: 20px;
    font-weight: 400;
    color: hsl(0, 0%, 17%);
  }
`;

const Chevron = styled(FaChevronRight)`
  color: #fff;
`;

function HeaderComponent() {
  return (
    <HeaderComponentStyled>
      <Header>IP Address Tracker</Header>
      <InputContainer>
        <Input value="192.212.174.101" />
        <Button>
          <Chevron />
        </Button>
      </InputContainer>
      <InfoContainer>
        <Info>
          <h3>Ip address</h3>
          <p>192.212.174.101</p>
        </Info>
        <Info>
          <h3>Location</h3>
          <p>Brooklyn, NY 10001</p>
        </Info>
        <Info>
          <h3>Timezone</h3>
          <p>UTC -05:00</p>
        </Info>
        <Info>
          <h3>Isp</h3>
          <p>SpaceX Starlink</p>
        </Info>
      </InfoContainer>
    </HeaderComponentStyled>
  );
}

export default HeaderComponent;
