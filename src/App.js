import { useState, useEffect, useRef } from 'react';
import './App.css';
import './Reset.css';
import HeaderComponent from './components/HeaderComponent';
import MapComponent from './components/MapComponent';

function App() {
  const [IP, setIP] = useState();
  const [geo, setGeo] = useState({
    ip: '192.212.174.101',
    isp: 'Southern California Edison',
    city: 'South San Gabriel',
    timezone: '-08:00',
  });
  const [position, setPosition] = useState([34.04915, -118.09462]);
  const firstUpdate = useRef(false);

  const fetchGeo = async (ipAddress) => {
    const response = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_pmVqW5gcyWCvjJkP882CUIaVoEoMn&ipAddress=${ipAddress}`
    );

    const data = await response.json();
    setGeo(data);
    return;
  };

  useEffect(() => {
    if (firstUpdate.current) {
      const position = [geo.location.lng, geo.location.lat];
      setPosition(position);
      console.log(geo);
      firstUpdate.current = true;
    } else {
      return;
    }
  }, [geo]);

  return (
    <div className="App">
      <HeaderComponent
        IP={IP}
        setIP={setIP}
        fetchGeo={() => fetchGeo(IP)}
        geo={geo}
      />
      <MapComponent position={position} />
    </div>
  );
}

export default App;
