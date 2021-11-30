import { useState, useEffect } from 'react';
import './App.css';
import './Reset.css';
import HeaderComponent from './Components/HeaderComponent';
import MapComponent from './Components/MapComponent';

import Theme from './Theme';

const apiKey = process.env.REACT_APP_API_KEY;

function App() {
  // variables
  // variable to check if this is the first time app is loading
  const [IP, setIP] = useState('');
  const [geo, setGeo] = useState();
  const [windowHeight, setWindowHeight] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showError, setShowError] = useState(false);

  const fetchGeo = async () => {
    // set show error to false to remove any previous errors
    // set loading to true to display loading bar
    setShowError(false);
    setIsLoading(true);
    // try to fetch data from api
    try {
      const apiCall = IP
        ? `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${IP}`
        : `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}`;
      const response = await fetch(apiCall);
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
      //if unsuccessful console.error and show error message.
      console.error(e);
      setShowError(true);
    }
    // change loading back to false to hide loading bar
    setIsLoading(false);
    return;
  };

  // event listener to set window height
  useEffect(() => {
    const updateHeight = () => {
      setWindowHeight(window.visualViewport.height);
    };
    window.addEventListener('resize', updateHeight);

    updateHeight();

    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // useEffect hook to update position on map when geo data is modified.
  useEffect(() => {
    fetchGeo();
     // eslint-disable-next-line
  }, [IP]);

  return (
    <div className="App" style={{ height: windowHeight }}>
      <Theme>
        <HeaderComponent
          setIP={setIP}
          fetchGeo={fetchGeo}
          geo={geo}
          isLoading={isLoading}
          showError={showError}
        />
        <MapComponent geo={geo} />
      </Theme>
    </div>
  );
}

export default App;
