import { useParams } from 'react-router-dom';

import { useWeather } from '../../../contexts/weather-context';
import { capitalizeFirstLetter } from '../../../utils/text-utils';

import TemperatureLabel from '../../components/unit-labels/TemperatureLabel';
import DistanceLabel from '../../components/unit-labels/DistanceLabel';
import SpeedLabel from '../../components/unit-labels/SpeedLabel';
import HumidityLabel from '../../components/unit-labels/HumidityLabel';
import HourLabel from '../../components/unit-labels/HourLabel';

import './LocationDetails.scss';

type LocationDetailsParams = {
  location: string;
};

const LocationDetails = () => {
  const { location } = useParams<keyof LocationDetailsParams>() as LocationDetailsParams;
  const { isLoadingWeather, getWeatherDataForLocation } = useWeather();

  if (isLoadingWeather) return <p>Loading weather data</p>;

  const weatherData = getWeatherDataForLocation(location);

  if (!weatherData) {
    throw new Error(`Could not find weather data for ${capitalizeFirstLetter(location)}`);
  }

  const { weather, main, sys, visibility, wind } = weatherData;

  return (
    <div className="weather-details">
      <article className="temperature-details">
        <h2>{weather[0].description}</h2>
        <p>
          <TemperatureLabel value={main.temp} />
        </p>
        <dl>
          <div>
            <dt>Highest:</dt>
            <dd>
              <TemperatureLabel value={main.temp_max} />
            </dd>
          </div>
          <div>
            <dt>Lowest:</dt>
            <dd>
              <TemperatureLabel value={main.temp_min} />
            </dd>
          </div>
        </dl>
      </article>
      <dl className="additional-details-section">
        <div>
          <dt>Sunrise</dt>
          <dd>
            <HourLabel value={sys.sunrise} />
          </dd>
        </div>
        <div>
          <dt>Sunset</dt>
          <dd>
            <HourLabel value={sys.sunset} />
          </dd>
        </div>
        <div>
          <dt>Visiblity</dt>
          <dd>
            <DistanceLabel value={visibility} />
          </dd>
        </div>
        <div>
          <dt>Wind</dt>
          <SpeedLabel value={wind.speed} />
        </div>
        <div>
          <dt>Humidity</dt>
          <HumidityLabel value={main.humidity} />
        </div>
      </dl>
    </div>
  );
};

export default LocationDetails;
