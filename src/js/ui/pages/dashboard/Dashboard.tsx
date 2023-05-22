import { useWeather } from '../../../contexts/weather-context';
import { toLowerCaseAndHyphenateText } from '../../../utils/text-utils';

import InputForm from '../../components/input-form/InputForm';
import LoadSpinner from '../../components/load-spinner/LoadSpinner';
import LocationLink from '../../components/location-link/LocationLink';

import './Dashboard.scss';

const Dashboard = () => {
  const {
    allWeatherData,
    addLocation,
    isLoadingWeather,
    getMyLocation,
    errorWithWeather,
    initWeatherData,
  } = useWeather();

  if (errorWithWeather) {
    if (errorWithWeather.type === 'Add location' || errorWithWeather.type === 'My location') {
      throw new Error(errorWithWeather.message);
    }

    if (errorWithWeather.type === 'Initialize') {
      return (
        <section className="error-page">
          <h2>Unable to initialize data</h2>
          <p className="error-message">{errorWithWeather.message}</p>
          <button
            type="button"
            onClick={initWeatherData}
          >
            Try again
          </button>
        </section>
      );
    }
  }

  return (
    <section className="dashboard">
      <div className="dashboard-actions">
        <button
          type="button"
          onClick={getMyLocation}
        >
          Get my location
        </button>
        <InputForm
          submitLabel="Add location"
          onSubmit={addLocation}
        />
      </div>
      {isLoadingWeather ? (
        <LoadSpinner label="Loading weather" />
      ) : (
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
      )}
    </section>
  );
};

export default Dashboard;
