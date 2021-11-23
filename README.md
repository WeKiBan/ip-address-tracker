function App() {
  const [ip, setIp] = '8.8.8.8';

  useEffect(() => {
    const fetchGeo = async () => {
      const response = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_pmVqW5gcyWCvjJkP882CUIaVoEoMn&ipAddress=${ip}`
      );

      const data = await response.json();

      return console.log(data);
    };
  }, [ip]);

  