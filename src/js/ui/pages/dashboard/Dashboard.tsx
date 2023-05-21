import React, { useEffect, useState } from 'react';

import { useWeather } from '../../../contexts/weather-context';
import { toLowerCaseAndHyphenateText } from '../../../utils/text-utils';
import { usePersonalization } from '../../../contexts/personalization-context';
import { convertTemperature } from '../../../utils/personalization-utils';

import Menu from '../../components/menu/Menu';
import LocationCard from '../../components/location-card/LocationCard';

const Dashboard = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { allWeatherData } = useWeather();
  const { temperatureUnit } = usePersonalization();

  return (
    <section>
      <section>
        <h1>Dashboard</h1>

        <button onClick={() => setShowMenu((show) => !show)}>Show menu</button>
        <Menu show={showMenu} />
      </section>
      <ul>
        {allWeatherData.map(({ name, main, id }) => (
          <li key={id}>
            <LocationCard
              name={name}
              url={`details/${toLowerCaseAndHyphenateText(name)}`}
              temperature={{
                value: convertTemperature(Math.floor(main.temp), temperatureUnit),
                unit: temperatureUnit,
              }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Dashboard;
