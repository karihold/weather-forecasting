import { useWeather } from '../../../contexts/weather-context';
import { toLowerCaseAndHyphenateText } from '../../../utils/text-utils';
import { usePersonalization } from '../../../contexts/personalization-context';
import { convertTemperature } from '../../../utils/personalization-utils';

import LocationCard from '../../components/location-card/LocationCard';

const Dashboard = () => {
  const { allWeatherData } = useWeather();
  const { temperatureUnit } = usePersonalization();

  return (
    <ul>
      {allWeatherData.map(({ name, main, id, isCurrentPosition }) => (
        <li key={id}>
          <LocationCard
            name={name}
            url={`details/${toLowerCaseAndHyphenateText(name)}`}
            isCurrentLocation={isCurrentPosition}
            temperature={{
              value: convertTemperature(Math.floor(main.temp), temperatureUnit),
              unit: temperatureUnit,
            }}
          />
        </li>
      ))}
    </ul>
  );
};

export default Dashboard;
