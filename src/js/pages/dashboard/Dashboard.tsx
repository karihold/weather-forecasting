import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import LocationCard from '../../components/location-card/LocationCard';

import { getWeatherDataForMultipleLocations, Weather } from '../../services/weather-services';
import { DEFAULT_LOCATIONS } from '../../constants/locations';

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState<Weather[]>([]);

  useEffect(() => {
    getWeatherDataForMultipleLocations(DEFAULT_LOCATIONS).then(setWeatherData);
  }, []);

  return (
    <section>
      <h1>Weather data</h1>
      <ul>
        {weatherData.map(({ name, main, id }) => (
          <li key={id}>
            <LocationCard
              name={name}
              temperature={main.temp}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Dashboard;
