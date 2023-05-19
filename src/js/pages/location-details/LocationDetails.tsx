import React from 'react';
import { useLoaderData, LoaderFunctionArgs } from 'react-router-dom';

import { getWeatherData, Weather } from '../../services/weather-services';

const LocationDetails = () => {
  const { weatherData } = useLoaderData() as { weatherData: Weather };

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

export async function locationDetailsLoader({ params }: LoaderFunctionArgs) {
  if (!params.locationName) throw new Error('Could not load location weather data');

  const weatherData = await getWeatherData(params.locationName);

  return { weatherData };
}

export default LocationDetails;
