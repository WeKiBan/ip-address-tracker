import { useState, useEffect, useRef } from 'react';
import './App.css';
import './Reset.css';
import HeaderComponent from './Components/HeaderComponent';
import MapComponent from './Components/MapComponent';
import { validateIPaddress } from './HelperFunctions/validateIpAddress';
import Theme from './Theme';

const API_KEY = process.env.REACT_API_KEY;

function App() {
  // variable to check if this is the first time app is loading
  const firstUpdate = useRef(true);
  const [IP, setIP] = useState('');
  const [geo, setGeo] = useState({
    ip: '192.212.174.101',
    isp: 'Southern California Edison',
    city: 'South San Gabriel',
    timezone: '-08:00',
  });
  // state variables
  const [position, setPosition] = useState([34.04915, -118.09462]);
  const [isLoading, setIsLoading] = useState(false);
  const [ipIsInvalid, setIpIsInvalid] = useState(false);
  const [showError, setShowError] = useState(false);

  // async function that fetches data from the api
  const fetchGeo = async (ipAddress) => {
    // check to see if input is valid
    if (!validateIPaddress(ipAddress)) {
      setIpIsInvalid(true);

      setTimeout(() => setIpIsInvalid(false), 3000);
      return;
    }
    // set show error to false to remove any previous errors
    // set loading to true to display loading bar
    setShowError(false);
    setIsLoading(true);
    // try to fetch data from api
    try {
      const response = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ipAddress}`
      );
      // if successful save destructured data in state
      const data = await response.json();

      setGeo({
        ip: data.ip,
        isp: data.isp,
        city: data.location.city,
        timezone: data.location.timezone,
        lat: data.location.lat,
        lng: data.location.lng,
      });
    } catch (e) {
      //if unsuccessful console.log error and show error message.
      console.error(e);
      setShowError(true);
    }
    // change loading back to false to hide loading bar
    setIsLoading(false);

    return;
  };
  // useEffect hook to update position on map when geo data is modified.
  useEffect(() => {
    // check to see if this is the first update of the app if it is change first update to false and dont go any further
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    // else set new position
    const position = [geo.lat, geo.lng];
    setPosition(position);
  }, [geo]);

  return (
    <div className="App">
      <Theme>
        <HeaderComponent
          ipIsInvalid={ipIsInvalid}
          IP={IP}
          setIP={setIP}
          fetchGeo={() => fetchGeo(IP)}
          geo={geo}
          isLoading={isLoading}
          showError={showError}
        />
        <MapComponent IP={geo.ip} position={position} />
      </Theme>
    </div>
  );
}

export default App;
