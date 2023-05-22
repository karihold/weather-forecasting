import { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react';

import {
  getWeatherForCoordinates,
  getWeatherForLocation,
  getWeatherForMultipleLocations,
  Weather,
} from '../services/weather-services';
import { toLowerCaseAndHyphenateText } from '../utils/text-utils';
import {
  setCurrentLocationInLocalStorage,
  getCurrentLocationFromLocalStorage,
  getCurrentLocation,
  setLocationInLocaleStorage,
  getLocationsFromLocaleStorage,
  hasCurrentLocationInLocaleStorage,
} from '../utils/location-utils';
import { DEFAULT_LOCATIONS } from '../constants/locations';

type WeatherContext = {
  allWeatherData: Weather[];
  getWeatherDataForLocation: (location: string) => Weather | undefined;
  addLocation: (location: string) => Promise<void>;
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
      const weatherDataForMyLocation = await getWeatherForCoordinates(
        currentCoordinates.lat,
        currentCoordinates.lon
      );

      weatherForCurrentPosition = [{ ...weatherDataForMyLocation, isCurrentPosition: true }];
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

  function addLocationsToWeatherMap(allWeatherData: Weather[]) {
    allWeatherData.forEach((data) => {
      const locationMapKey = toLowerCaseAndHyphenateText(data.name);

      weatherMap.current.set(locationMapKey, data);
    });
  }

  async function addLocation(location: string) {
    setIsLoadingWeather(true);

    if (weatherMap.current.has(location.toLocaleLowerCase())) {
      setIsLoadingWeather(false);
      return;
    }

    const weatherForLocation = await getWeatherForLocation(location);

    setLocationInLocaleStorage(location);
    addLocationsToWeatherMap([weatherForLocation]);

    setWeatherData((currentWeatherData) => {
      const updatedWeatherData = [...currentWeatherData, weatherForLocation];

      return updatedWeatherData;
    });

    setIsLoadingWeather(false);
  }

  async function getMyLocation() {
    setIsLoadingWeather(true);

    const { lat, lon } = await getCurrentLocation();

    const weatherDataFromApi = await getWeatherForCoordinates(lat, lon);
    const weatherForMyLocation = { ...weatherDataFromApi, isCurrentPosition: true } as Weather;

    addLocationsToWeatherMap([weatherForMyLocation]);

    setWeatherData((currentWeatherData) => {
      const currentWeatherDataToKeep = hasCurrentLocationInLocaleStorage()
        ? currentWeatherData.slice(1)
        : currentWeatherData;

      setCurrentLocationInLocalStorage({ lat, lon });

      return [weatherForMyLocation, ...currentWeatherDataToKeep];
    });

    setIsLoadingWeather(false);
  }

  function getWeatherDataForLocation(location: string) {
    return weatherMap.current.get(location);
  }

  return (
    <WeatherContext.Provider
      value={{
        allWeatherData,
        getWeatherDataForLocation,
        addLocation,
        getMyLocation,
        isLoadingWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
