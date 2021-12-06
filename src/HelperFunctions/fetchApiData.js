const apiKey = process.env.REACT_APP_API_KEY;

export const fetchData = async (IP) => {
  //if no IP is set call without ip Address to retrieve users details
  const apiCall = IP
    ? `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${IP}`
    : `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}`;
  const response = await fetch(apiCall);
  // if successful save destructured data in state

  return response;
};
