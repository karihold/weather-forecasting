import React, { createContext, useContext, useState, Dispatch, ReactNode } from 'react';

export type TemperatureUnit = 'celsius' | 'farenheit' | 'kelvin';

export type LengthUnit = 'metric' | 'imperial';

type PersonalizationContext = {
  temperatureUnit: TemperatureUnit;
  setTemperatureUnit: Dispatch<React.SetStateAction<TemperatureUnit>>;
  lengthUnit: LengthUnit;
  setLengthUnit: Dispatch<React.SetStateAction<LengthUnit>>;
};

const PersonalizationContext = createContext<PersonalizationContext>({} as PersonalizationContext);

export const usePersonalization = () => useContext<PersonalizationContext>(PersonalizationContext);

type PersonalizationProviderProps = {
  children: ReactNode | ReactNode[];
};

export const PersonalizationProvider = ({ children }: PersonalizationProviderProps) => {
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>('celsius');
  const [lengthUnit, setLengthUnit] = useState<LengthUnit>('metric');

  return (
    <PersonalizationContext.Provider
      value={{ temperatureUnit, setTemperatureUnit, lengthUnit, setLengthUnit }}
    >
      {children}
    </PersonalizationContext.Provider>
  );
};
