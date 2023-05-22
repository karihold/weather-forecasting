import { useWeather } from '../../../contexts/weather-context';
import { toLowerCaseAndHyphenateText } from '../../../utils/text-utils';

import InputForm from '../../components/input-form/InputForm';
import LocationLink from '../../components/location-link/LocationLink';

import './Dashboard.scss';

const Dashboard = () => {
  const { allWeatherData, addLocationWeather, getMyLocation } = useWeather();

  return (
    <section className="dashboard">
      <div className="dashboard-actions">
        <button onClick={getMyLocation}>Get my location</button>
        <InputForm
          submitLabel="Find location"
          onSubmit={addLocationWeather}
        />
      </div>
      <ul className="location-grid">
        {allWeatherData.map(({ name, main, id, isCurrentPosition }) => (
          <li
            key={id}
            className="location-grid-item"
          >
            <LocationLink
              name={name}
              url={`details/${toLowerCaseAndHyphenateText(name)}`}
              isCurrentLocation={isCurrentPosition}
              temperature={main.temp}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Dashboard;
