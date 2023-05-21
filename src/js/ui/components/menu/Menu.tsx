import React from 'react';

import { useWeather } from '../../../contexts/weather-context';
import {
  usePersonalization,
  TemperatureUnit,
  DistanceUnit,
} from '../../../contexts/personalization-context';

import InputForm from '../input-form/InputForm';
import RadioGroup from '../radio-button/RadioGroup';

type MenuProps = {
  show: boolean;
};

const Menu = ({ show }: MenuProps) => {
  const { addLocationWeather, getMyLocation } = useWeather();
  const { temperatureUnit, changeTemperatureUnit, distanceUnit, changeDistanceUnit } =
    usePersonalization();

  if (!show) return <></>;

  return (
    <section>
      <button onClick={getMyLocation}>Get my location</button>
      <InputForm
        submitLabel="Find location"
        onSubmit={addLocationWeather}
      />
      <RadioGroup<TemperatureUnit>
        name="unit-of-temperature"
        legend="Temperature"
        onChange={changeTemperatureUnit}
        options={[
          { label: 'Celsius', value: 'celsius', isChecked: temperatureUnit === 'celsius' },
          { label: 'Farenheit', value: 'fahrenheit', isChecked: temperatureUnit === 'fahrenheit' },
          { label: 'Kelvin', value: 'kelvin', isChecked: temperatureUnit === 'kelvin' },
        ]}
      />
      <RadioGroup<DistanceUnit>
        name="unit-of-length"
        legend="Length"
        onChange={changeDistanceUnit}
        options={[
          { label: 'Metric', value: 'metric', isChecked: distanceUnit === 'metric' },
          { label: 'Imperial', value: 'imperial', isChecked: distanceUnit === 'imperial' },
        ]}
      />
    </section>
  );
};

export default Menu;
