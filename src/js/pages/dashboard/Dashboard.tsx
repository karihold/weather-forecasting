import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import LocationCard from '../../components/location-card/LocationCard';

import { getWeatherData } from '../../services/weather-services';

const Dashboard = () => {
  useEffect(() => {
    getWeatherData().then((data) => console.log(data));
  }, []);

  return (
    <section>
      <h1>Weather data</h1>
      <ul>
        <li>
          <LocationCard
            name="London"
            temperature={13}
          />
        </li>
        <li>
          <LocationCard
            name="Berlin"
            temperature={15}
          />
        </li>
      </ul>
    </section>
  );
};

export default Dashboard;
