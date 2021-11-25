import React from 'react';
import styled from 'styled-components';
import backgroundImg from '../images/pattern-bg.png';
import { FaChevronRight } from 'react-icons/fa';
import BarLoader from 'react-spinners/BarLoader';

const HeaderComponentStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: url(${backgroundImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 35vh;
  max-height: 225px;
  font-family: ${({ theme }) => theme.font.fontFamily};
  padding-bottom: 20px;
`;

const Header = styled.h1`
  margin: 10px 0;
  color: #fff;
  font-weight: 400;
  font-size: 23px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  max-width: 600px;
  border-radius: 10px;
  margin-bottom: 25px;
  align-items: center;
  border: ${({ ipIsInvalid, theme }) =>
    ipIsInvalid ? `3px solid ${theme.colors.warningRed}` : 'none'};
`;

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
`;

const Input = styled.input`
  flex-grow: 1;
  border: none;
  padding-left: 20px;
  padding-right: 20px;
  font-weight: 300;
  box-sizing: border-box;
  font-size: 16px;
  height: 40px;
`;

const Button = styled.button`
  height: 40px;
  width: 40px;
  border: none;
  background: hsl(0, 0%, 17%);
  cursor: pointer;
`;

const Error = styled.p`
  display: ${({ ipIsInvalid }) => (ipIsInvalid ? 'block' : 'none')};
  color: ${({ theme }) => theme.warningRed};
  padding: 10px;
`;

const InfoContainer = styled.div`
  position: absolute;
  display: grid;
  background: #fff;
  width: 85%;
  max-width: 1200px;
  border-radius: 10px;
  padding: 20px;
  z-index: 1000;
  bottom: 0;
  transform: translateY(60%);

  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.mobile}) {
    padding: 10px 0;
  }
  @media only screen and (orientation: landscape) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    width: 95%;
    max-width: 950px;
    font-size: 12px;
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ApiError = styled.p`
  font-size: 18px;
  font-weight: 300;
  text-align: center;
`;

const Info = styled.div`
  text-align: center;
  width: 100%;
  max-width: 100%;
  padding: 0 5px;
  @media only screen and (orientation: landscape) {
    border-right: 1px lightGrey solid;
    :last-of-type {
      border: none;
    }
  }

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
    word-break: keep-all;
    white-space: normal;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    h3 {
      font-size: 8px;
    }
    p {
      font-size: 16px;
    }
  }
`;

const Chevron = styled(FaChevronRight)`
  color: #fff;
`;

function HeaderComponent({
  IP,
  setIP,
  fetchGeo,
  geo,
  isLoading,
  ipIsInvalid,
  showError,
}) {
  const { city, isp, ip, timezone } = geo;

  return (
    <HeaderComponentStyled>
      <Header>IP Address Tracker</Header>
      <InputWrapper ipIsInvalid={ipIsInvalid}>
        <InputContainer>
          <Input
            onChange={(e) => setIP(e.target.value)}
            type="text"
            value={IP}
            placeholder="Enter IP Address..."
          />
          <Button onClick={fetchGeo}>
            <Chevron />
          </Button>
        </InputContainer>
        <Error ipIsInvalid={ipIsInvalid}>
          Please enter a valid IP address...
        </Error>
      </InputWrapper>

      <InfoContainer>
        {isLoading ? (
          <Container>
            <BarLoader />
          </Container>
        ) : showError ? (
          <Container>
            <ApiError>
              Unable to locate IP Address <br /> Please try a different address
            </ApiError>
          </Container>
        ) : (
          <>
            <Info>
              <h3>Ip address</h3>
              <p>{ip}</p>
            </Info>
            <Info>
              <h3>Location</h3>
              <p>{city}</p>
            </Info>
            <Info>
              <h3>Timezone</h3>
              <p>UTC {timezone}</p>
            </Info>
            <Info>
              <h3>Isp</h3>
              <p>{isp}</p>
            </Info>
          </>
        )}
      </InfoContainer>
    </HeaderComponentStyled>
  );
}

export default HeaderComponent;
