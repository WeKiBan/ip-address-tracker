import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import backgroundImg from '../images/pattern-bg.png';
import { FaChevronRight } from 'react-icons/fa';
import BarLoader from 'react-spinners/BarLoader';
import { validateIPaddress } from '../HelperFunctions/validateIpAddress';

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
  font-family: ${({ theme }) => theme.font.fontFamily};
  padding-bottom: ${({ infoHeight }) => infoHeight * 0.4 + 20 + 'px'};
  padding-top: 20px;

  @media only screen and (orientation: landscape) {
    border-right: 1px lightGrey solid;
    :last-of-type {
      border: none;
    }
    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.desktop}) {
      padding-top: 50px;
      padding-bottom: ${({ infoHeight }) => infoHeight * 0.4 + 50 + 'px'};
    }
  }
`;

const Header = styled.h1`
  margin-bottom: 10px;
  color: #fff;
  font-weight: 400;
  font-size: 23px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 85%;
  align-items: center;
  border: ${({ ipIsInvalid, theme }) =>
    ipIsInvalid ? `3px solid ${theme.colors.warningRed}` : 'none'};
`;

const FormStyled = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
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
  font-size: min(2vmax, 16px);
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
  min-height: 200px;
  max-width: 1200px;
  border-radius: 10px;
  z-index: 1000;
  bottom: 0;
  transform: translateY(60%);
  padding: 10px;
  @media only screen and (orientation: landscape) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    width: 95%;
    max-width: 950px;
    min-height: 50px;
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
  padding: 5px;
  font-size: 10px;

  h3 {
    text-transform: uppercase;
    color: hsl(0, 0%, 59%);
    font-size: min(1.5vmax, 14px);
    margin-bottom: 5px;
    font-weight: 500;
    letter-spacing: 1px;
  }
  p {
    font-size: min(2vmax, 20px);
    font-weight: 400;
    color: hsl(0, 0%, 17%);
    word-break: keep-all;
    white-space: normal;
  }

  @media only screen and (orientation: landscape) {
    border-right: 1px lightGrey solid;
    :last-of-type {
      border: none;
    }
    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.desktop}) {
      padding: 30px;
    }
  }
`;

const Chevron = styled(FaChevronRight)`
  color: #fff;
`;

function HeaderComponent({ IP, setIP, fetchGeo, geo, isLoading, showError }) {
  const [ipValue, setIpValue] = useState('');
  const [ipIsInvalid, setIpIsInvalid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateIPaddress(ipValue)) {
      setIP(ipValue);
    } else {
      setIpIsInvalid(true);
      setTimeout(() => setIpIsInvalid(false), 3000);
    }
  };

  // Dynamically adjust container Height
  const InfoContainerRef = useRef();
  const [infoContainerHeight, setInfoContainerHeight] = useState();
  useEffect(() => {
    const updateHeight = () => {
      const height = InfoContainerRef.current.clientHeight;
      setInfoContainerHeight(height);
    };
    window.addEventListener('resize', updateHeight);

    updateHeight();

    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <HeaderComponentStyled infoHeight={infoContainerHeight}>
      <Header>IP Address Tracker</Header>
      <InputWrapper ipIsInvalid={ipIsInvalid}>
        <FormStyled
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <Input
            onChange={(e) => setIpValue(e.target.value)}
            type="text"
            value={ipValue}
            placeholder="Enter IP Address..."
          />
          <Button type="submit">
            <Chevron />
          </Button>
        </FormStyled>
        <Error ipIsInvalid={ipIsInvalid}>
          Please enter a valid IP address...
        </Error>
      </InputWrapper>

      <InfoContainer ref={InfoContainerRef}>
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
              <p>{geo.ip}</p>
            </Info>
            <Info>
              <h3>Location</h3>
              <p>{geo.city}</p>
            </Info>
            <Info>
              <h3>Timezone</h3>
              <p>{geo.timezone}</p>
            </Info>
            <Info>
              <h3>Isp</h3>
              <p>{geo.isp}</p>
            </Info>
          </>
        )}
      </InfoContainer>
    </HeaderComponentStyled>
  );
}

export default HeaderComponent;
