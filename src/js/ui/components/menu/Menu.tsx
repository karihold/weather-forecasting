import React from 'react';

import { useWeather } from '../../../contexts/weather-context';
import {
  usePersonalization,
  TemperatureUnit,
  LengthUnit,
} from '../../../contexts/personalization-context';

import InputForm from '../input-form/InputForm';
import RadioGroup from '../radio-button/RadioGroup';

type MenuProps = {
  show: boolean;
};

const Menu = ({ show }: MenuProps) => {
  const { addLocationWeather, getMyLocation } = useWeather();
  const { temperatureUnit, setTemperatureUnit, lengthUnit, setLengthUnit } = usePersonalization();

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
        onChange={setTemperatureUnit}
        options={[
          { label: 'Celsius', value: 'celsius', isChecked: temperatureUnit === 'celsius' },
          { label: 'Farenheit', value: 'farenheit', isChecked: temperatureUnit === 'farenheit' },
          { label: 'Kelvin', value: 'kelvin', isChecked: temperatureUnit === 'kelvin' },
        ]}
      />
      <RadioGroup<LengthUnit>
        name="unit-of-length"
        legend="Length"
        onChange={setLengthUnit}
        options={[
          { label: 'Metric', value: 'imperial', isChecked: lengthUnit === 'metric' },
          { label: 'Imperial', value: 'metric', isChecked: lengthUnit === 'imperial' },
        ]}
      />
    </section>
  );
};

export default Menu;
