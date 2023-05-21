import React from 'react';
import { useParams } from 'react-router-dom';

import { useWeather } from '../../../contexts/weather-context';
import { capitalizeFirstLetter } from '../../../utils/text-utils';

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

  return (
    <section>
      <h1>Welcomet to {weatherData.name}</h1>
      <section>
        <p>{weatherData.weather[0].description}</p>
        <p>{weatherData.main.temp}</p>
        <p>{weatherData.main.temp_max}</p>
        <p>{weatherData.main.temp_min}</p>
      </section>
      <section>
        <p>{weatherData.sys.sunrise}</p>
        <p>{weatherData.sys.sunset}</p>
        <p>{weatherData.main.humidity}</p>
        <p>{weatherData.visibility}</p>
      </section>
    </section>
  );
};

export default LocationDetails;
