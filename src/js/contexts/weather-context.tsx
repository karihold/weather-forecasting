import { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react';

import {
  getWeatherForCoordinates,
  getWeatherForLocation,
  getWeatherForMultipleLocations,
  Weather,
} from '../services/weather-services';
import { toLowerCaseAndHyphenateText } from '../utils/text-utils';
import {
  getCurrentLocationFromLocalStorage,
  getCurrentLocation,
  setLocationInLocaleStorage,
  getLocationsFromLocaleStorage,
} from '../utils/location-utils';
import { DEFAULT_LOCATIONS } from '../constants/locations';

type WeatherContext = {
  allWeatherData: Weather[];
  getWeatherDataForLocation: (location: string) => Weather | undefined;
  addLocationWeather: (location: string) => Promise<void>;
  getMyLocation: () => void;
  isLoadingWeather: boolean;
};

const WeatherContext = createContext<WeatherContext>({} as WeatherContext);

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
    const currentCoordinates = getCurrentLocationFromLocalStorage();
    const storedLocations = getLocationsFromLocaleStorage();
    let weatherForCurrentPosition = [] as Weather[];
    let weatherForStoreLocations = [] as Weather[];

    if (currentCoordinates) {
      weatherForCurrentPosition = [
        await getWeatherForCoordinates(currentCoordinates.lat, currentCoordinates.lon),
      ];
    }

    if (storedLocations) {
      weatherForStoreLocations = await getWeatherForMultipleLocations(storedLocations);
    }

    const allWeatherDataFromApi = await getWeatherForMultipleLocations(DEFAULT_LOCATIONS);
    const combinedWeatherData = [
      ...weatherForCurrentPosition,
      ...allWeatherDataFromApi,
      ...weatherForStoreLocations,
    ];

    addLocationsToWeatherMap(combinedWeatherData);
    setWeatherData(combinedWeatherData);
    setIsLoadingWeather(false);
  }

  async function addLocationWeather(location: string) {
    const weather = await getWeatherForLocation(location);

    setLocationInLocaleStorage(location);

    setWeatherData((currentWeatherData) => [...currentWeatherData, weather]);
  }

  async function getMyLocation() {
    const { lat, lon } = await getCurrentLocation();

    const weatherForMyLocation = await getWeatherForCoordinates(lat, lon);

    setWeatherData((currentWeatherData) => [weatherForMyLocation, ...currentWeatherData]);
  }

  function addLocationsToWeatherMap(allWeatherData: Weather[]) {
    allWeatherData.forEach((data) => {
      const locationMapKey = toLowerCaseAndHyphenateText(data.name);

      weatherMap.current.set(locationMapKey, data);
    });
  }

  function getWeatherDataForLocation(location: string) {
    return weatherMap.current.get(location);
  }

  return (
    <WeatherContext.Provider
      value={{
        allWeatherData,
        getWeatherDataForLocation,
        addLocationWeather,
        getMyLocation,
        isLoadingWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
