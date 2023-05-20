import { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react';

import { getWeatherForMultipleLocations, Weather } from '../services/weather-services';
import { toLowerCaseAndHyphenateText } from '../utils/text-utils';
import { DEFAULT_LOCATIONS } from '../constants/locations';

type WeatherContext = {
  allWeatherData: Weather[];
  getWeatherForLocation: (location: string) => Weather | undefined;
  isLoadingWeather: boolean;
};

export const WeatherContext = createContext<WeatherContext>({} as WeatherContext);

export const useWeather = () => useContext<WeatherContext>(WeatherContext);

type WeatherProviderProps = {
  children: ReactNode | ReactNode[];
};

export const WeatherProvider = ({ children }: WeatherProviderProps) => {
  const [allWeatherData, setWeatherData] = useState<Weather[]>([]);
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);

  const weatherMap = useRef(new Map<string, Weather>());

  useEffect(() => {
    initWeatherData();
  }, []);

  async function initWeatherData() {
    const allWeatherData = await getWeatherForMultipleLocations(DEFAULT_LOCATIONS);

    addLocationsToWeatherMap(allWeatherData);
    setWeatherData(allWeatherData);
    setIsLoadingWeather(false);
  }

  function addLocationsToWeatherMap(allWeatherData: Weather[]) {
    allWeatherData.forEach((data) => {
      const locationMapKey = toLowerCaseAndHyphenateText(data.name);

      weatherMap.current.set(locationMapKey, data);
    });
  }

  function getWeatherForLocation(location: string) {
    return weatherMap.current.get(location);
  }

  return (
    <WeatherContext.Provider value={{ allWeatherData, getWeatherForLocation, isLoadingWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};
