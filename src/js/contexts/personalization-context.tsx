import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import {
  getPersonalizationFromLocaleStorage,
  setPersonalizationInLocaleStorage,
} from '../utils/personalization-utils';

export type TemperatureUnit = 'celsius' | 'fahrenheit' | 'kelvin';

export type DistanceUnit = 'metric' | 'imperial';

type PersonalizationContext = {
  temperatureUnit: TemperatureUnit;
  changeTemperatureUnit: (unit: TemperatureUnit) => void;
  distanceUnit: DistanceUnit;
  changeDistanceUnit: (unit: DistanceUnit) => void;
};

const PersonalizationContext = createContext<PersonalizationContext>({} as PersonalizationContext);

export const usePersonalization = () => useContext<PersonalizationContext>(PersonalizationContext);

type PersonalizationProviderProps = {
  children: ReactNode | ReactNode[];
};

export const PersonalizationProvider = ({ children }: PersonalizationProviderProps) => {
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>('celsius');
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>('metric');

  useEffect(() => {
    const storedPersonalization = getPersonalizationFromLocaleStorage();

    if (storedPersonalization) {
      const { distance, temperature } = storedPersonalization;

      setTemperatureUnit(temperature);
      setDistanceUnit(distance);
    }
  }, []);

  function changeTemperatureUnit(unit: TemperatureUnit) {
    setTemperatureUnit(unit);

    setPersonalizationInLocaleStorage('temperature', unit);
  }

  function changeDistanceUnit(unit: DistanceUnit) {
    setDistanceUnit(unit);

    setPersonalizationInLocaleStorage('distance', unit);
  }

  return (
    <PersonalizationContext.Provider
      value={{ temperatureUnit, changeTemperatureUnit, distanceUnit, changeDistanceUnit }}
    >
      {children}
    </PersonalizationContext.Provider>
  );
};
