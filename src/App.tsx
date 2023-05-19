import { useEffect } from 'react';

import { getWeatherData } from './services/weather-service';

import './App.scss';

function App() {
  useEffect(() => {
    getWeatherData().then((data) => console.log(data));
  }, []);

  return (
    <main>
      <h1>Weather data</h1>
    </main>
  );
}

export default App;
