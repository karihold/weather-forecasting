import React, { createContext, useContext, useState, Dispatch, ReactNode, useEffect } from 'react';
import {
  getPersonalizationFromLocaleStorage,
  setPersonalizationInLocaleStorage,
} from '../utils/personalization-utils';

export type TemperatureUnit = 'celsius' | 'fahrenheit' | 'kelvin';

export type LengthUnit = 'metric' | 'imperial';

type PersonalizationContext = {
  temperatureUnit: TemperatureUnit;
  changeTemperatureUnit: (unit: TemperatureUnit) => void;
  lengthUnit: LengthUnit;
  changeLengthUnit: (unit: LengthUnit) => void;
};

const PersonalizationContext = createContext<PersonalizationContext>({} as PersonalizationContext);

export const usePersonalization = () => useContext<PersonalizationContext>(PersonalizationContext);

type PersonalizationProviderProps = {
  children: ReactNode | ReactNode[];
};

export const PersonalizationProvider = ({ children }: PersonalizationProviderProps) => {
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>('celsius');
  const [lengthUnit, setLengthUnit] = useState<LengthUnit>('metric');

  useEffect(() => {
    const storedPersonalization = getPersonalizationFromLocaleStorage();

    if (storedPersonalization) {
      const { length, temperature } = storedPersonalization;

      setTemperatureUnit(temperature);
      setLengthUnit(length);
    }
  }, []);

  function changeTemperatureUnit(unit: TemperatureUnit) {
    setTemperatureUnit(unit);

    setPersonalizationInLocaleStorage('temperature', unit);
  }

  function changeLengthUnit(unit: LengthUnit) {
    setLengthUnit(unit);

    setPersonalizationInLocaleStorage('length', unit);
  }

  return (
    <PersonalizationContext.Provider
      value={{ temperatureUnit, changeTemperatureUnit, lengthUnit, changeLengthUnit }}
    >
      {children}
    </PersonalizationContext.Provider>
  );
};
