import { useState, useEffect } from 'react';
import './App.css';
import './Reset.css';
import HeaderComponent from './components/HeaderComponent';
import MapComponent from './components/MapComponent';

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <MapComponent />
    </div>
  );
}

export default App;
