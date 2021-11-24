import { useState, useEffect, useRef } from 'react';
import './App.css';
import './Reset.css';
import HeaderComponent from './components/HeaderComponent';
import MapComponent from './components/MapComponent';
import { ValidateIPaddress } from './helper functions/validateIpAddress';

function App() {
  const [IP, setIP] = useState('');
  const [geo, setGeo] = useState({
    ip: '192.212.174.101',
    isp: 'Southern California Edison',
    city: 'South San Gabriel',
    timezone: '-08:00',
  });
  const [position, setPosition] = useState([34.04915, -118.09462]);
  const [isLoading, setIsLoading] = useState(false);
  const [ipIsInvalid, setIpIsInvalid] = useState(false);
  const firstUpdate = useRef(true);
  const [showError, setShowError] = useState(false);

  const fetchGeo = async (ipAddress) => {
    if (!ValidateIPaddress(ipAddress)) {
      setIpIsInvalid(true);

      setTimeout(() => setIpIsInvalid(false), 3000);
      return;
    }
    setShowError(false);
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_pmVqW5gcyWCvjJkP882CUIaVoEoMn&ipAddress=${ipAddress}`
      );

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
      console.error(e);
      setShowError(true);
    }

    setIsLoading(false);

    return;
  };

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const position = [geo.lat, geo.lng];
    setPosition(position);
  }, [geo]);

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
