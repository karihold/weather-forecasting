import { useWeather } from '../../../contexts/weather-context';
import { toLowerCaseAndHyphenateText } from '../../../utils/text-utils';

import LocationCard from '../../components/location-card/LocationCard';

import './Dashboard.scss';

const Dashboard = () => {
  const { allWeatherData } = useWeather();

  return (
    <ul className="location-grid">
      {allWeatherData.map(({ name, main, id, isCurrentPosition }) => (
        <li
          key={id}
          className="location-link"
        >
          <LocationCard
            name={name}
            url={`details/${toLowerCaseAndHyphenateText(name)}`}
            isCurrentLocation={isCurrentPosition}
            temperature={main.temp}
          />
        </li>
      ))}
    </ul>
  );
};

export default Dashboard;
