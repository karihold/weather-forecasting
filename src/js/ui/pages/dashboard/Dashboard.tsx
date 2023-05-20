import React from 'react';

import { useWeather } from '../../../contexts/weather-context';
import { toLowerCaseAndHyphenateText } from '../../../utils/text-utils';

import LocationCard from '../../components/location-card/LocationCard';

const Dashboard = () => {
  const { allWeatherData } = useWeather();

  return (
    <section>
      <h1>Weather data</h1>
      <ul>
        {allWeatherData.map(({ name, main, id }) => (
          <li key={id}>
            <LocationCard
              name={name}
              url={`details/${toLowerCaseAndHyphenateText(name)}`}
              temperature={main.temp}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Dashboard;
