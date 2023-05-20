import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

import { getWeatherForMultipleLocations, Weather } from '../services/weather-services';
import { DEFAULT_LOCATIONS } from '../constants/locations';

type WeatherContext = {
  weatherData: Weather[];
};

export const WeatherContext = createContext<WeatherContext>({} as WeatherContext);

export const useWeather = () => useContext<WeatherContext>(WeatherContext);

type WeatherProviderProps = {
  children: ReactNode | ReactNode[];
};

export const WeatherProvider = ({ children }: WeatherProviderProps) => {
  const [weatherData, setWeatherData] = useState<Weather[]>([]);

  useEffect(() => {
    getWeatherForMultipleLocations(DEFAULT_LOCATIONS).then(setWeatherData);
  }, []);

  return <WeatherContext.Provider value={{ weatherData }}>{children}</WeatherContext.Provider>;
};
