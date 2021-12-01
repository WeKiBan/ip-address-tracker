# IP Address Tracker App

This is a solution to the [IP address tracker challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for each page depending on their device's screen size
- See hover states for all interactive elements on the page
- See their own IP address on the map on the initial page load
- Search for any IP addresses or domains and see the key information and location

### Screenshot

![](src/images/demoGif.gif)

### Links

- Solution URL: [https://github.com/WeKiBan/ip-address-tracker](https://github.com/WeKiBan/ip-address-tracker)
- Live Site URL: [https://address-tracker-app.netlify.app/](https://github.com/WeKiBan/ip-address-tracker)

## My process

### Built with

- HTML/CSS
- Flexbox
- Grid
- [React](https://reactjs.org/) - JS library
- [Styled Components](https://styled-components.com/) - For Styling.
- [React Leaflet](https://react-leaflet.js.org/) Map API
- [IPify](https://www.ipify.org/) - IP Address API

### What I learned

While creating this project I learned how to use the Leaflet Map API. As Leaflet has a React version it is very easy to implement. After installing the dependency you can import the components just like any other React component and then use these to create the map.

```javaScript
    <MapComponentStyled
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      zoomControl={false}
      dragging={false}
      touchZoom={false}
      doubleClickZoom={false}
      trackResize={true}
    >
      <ChangeView center={position} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerStyled icon={markerIcon} position={position}>
        <Popup>{IP}</Popup>
      </MarkerStyled>
    </MapComponentStyled>
```

The location on this map is updated on the initial load providing the users IP address info and then subsequently each time the user enters an IP into the input.

```javaScript
 useEffect(() => {
    fetchGeo();
  }, [IP]);
```

```javaScript
const fetchGeo = async () => {
    // set show error to false to remove any previous errors
    // set loading to true to display loading bar
    setShowError(false);
    setIsLoading(true);
    // try to fetch data from api
    try {
      //if no IP is set call without ip Address to retrieve users details
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
```

In order to make the site responsive I used javascript to calculate the size of the innerWindow and added a resize event listener to keep track of the window height. by doing this I was able to prevent a part of the app being hidden because of the address bar on the initial load.

```javaScript
 useEffect(() => {
    const updateHeight = () => {
      setWindowHeight(window.visualViewport.height);
    };
    window.addEventListener('resize', updateHeight);

    updateHeight();

    return () => window.removeEventListener('resize', updateHeight);
  }, []);
```

I learned a lot during this process and it has helped to further improve my knowledge of React. I also really enjoyed using the Leaflet API and would really like to build a more complex project in the future using this API.

### Continued development

### Useful resources

- [Mapping With React Leaflet](https://egghead.io/courses/mapping-with-react-leaflet-e0e0) - This helped me to understand how to use the React Leaflet API would definitely recommend this course to anyone else looking to utilise it in their project.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

## Author

- Website - [Wes Banyard](https://www.wesbanyard.dev)
- LinkedIn - [](https://www.linkedin.com/in/wes-banyard/)
