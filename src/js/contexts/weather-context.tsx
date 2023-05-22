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

type WeatherError = {
  type: 'Initialize' | 'My location' | 'Add location';
  message: string;
};

type WeatherContext = {
  allWeatherData: Weather[];
  initWeatherData: () => void;
  getWeatherDataForLocation: (location: string) => Weather | undefined;
  addLocation: (location: string) => Promise<void>;
  getMyLocation: () => void;
  resetWeatherError: () => void;
  isLoadingWeather: boolean;
  errorWithWeather: undefined | WeatherError;
};

const WeatherContext = createContext<WeatherContext>({} as WeatherContext);

export const useWeather = () => useContext<WeatherContext>(WeatherContext);

type WeatherProviderProps = {
  children: ReactNode | ReactNode[];
};

export const WeatherProvider = ({ children }: WeatherProviderProps) => {
  const [allWeatherData, setWeatherData] = useState<Weather[]>([]);
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);
  const [errorWithWeather, setErrorWithWeather] = useState<undefined | WeatherError>(undefined);

  const weatherMap = useRef(new Map<string, Weather>());

  useEffect(() => {
    initWeatherData();
  }, []);

  async function initWeatherData() {
    if (!isLoadingWeather) {
      setIsLoadingWeather(true);
    }

    resetWeatherError();

    try {
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
    } catch (error) {
      setIsLoadingWeather(false);
      setErrorWithWeather({ type: 'Initialize', message: (error as Error).message });
    }
  }

  function addLocationsToWeatherMap(allWeatherData: Weather[]) {
    allWeatherData.forEach((data) => {
      const locationMapKey = toLowerCaseAndHyphenateText(data.name);

      weatherMap.current.set(locationMapKey, data);
    });
  }

  async function addLocation(location: string) {
    setIsLoadingWeather(true);
    resetWeatherError();

    if (weatherMap.current.has(location.toLocaleLowerCase())) {
      setIsLoadingWeather(false);
      return;
    }

    try {
      const weatherForLocation = await getWeatherForLocation(location);

      setLocationInLocaleStorage(location);
      addLocationsToWeatherMap([weatherForLocation]);

      setWeatherData((currentWeatherData) => {
        const updatedWeatherData = [...currentWeatherData, weatherForLocation];

        return updatedWeatherData;
      });

      setIsLoadingWeather(false);
    } catch (error) {
      setIsLoadingWeather(false);
      setErrorWithWeather({ type: 'Add location', message: (error as Error).message });
    }
  }

  async function getMyLocation() {
    setIsLoadingWeather(true);
    resetWeatherError();

    try {
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
    } catch (error) {
      setIsLoadingWeather(false);
      setErrorWithWeather({ type: 'My location', message: (error as Error).message });
    }
  }

  function resetWeatherError() {
    if (errorWithWeather) {
      setErrorWithWeather(undefined);
    }
  }

  function getWeatherDataForLocation(location: string) {
    return weatherMap.current.get(location);
  }

  return (
    <WeatherContext.Provider
      value={{
        allWeatherData,
        initWeatherData,
        getWeatherDataForLocation,
        addLocation,
        getMyLocation,
        isLoadingWeather,
        errorWithWeather,
        resetWeatherError,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
