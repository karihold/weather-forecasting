import { Outlet, Link, useMatch } from 'react-router-dom';

import {
  TemperatureUnit,
  DistanceUnit,
  usePersonalization,
} from './js/contexts/personalization-context';
import { useWeather } from './js/contexts/weather-context';

import InputForm from './js/ui/components/input-form/InputForm';
import RadioGroup from './js/ui/components/radio-button/RadioGroup';

import './App.scss';

const App = () => {
  const { addLocationWeather, getMyLocation } = useWeather();
  const { temperatureUnit, changeTemperatureUnit, distanceUnit, changeDistanceUnit } =
    usePersonalization();

  const isAtDashboard = useMatch('/');

  return (
    <>
      <header>
        {!isAtDashboard && <Link to="/">Back</Link>}
        <h1>Test</h1>{' '}
        <section className="personalization-menu">
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
              {
                label: 'Farenheit',
                value: 'fahrenheit',
                isChecked: temperatureUnit === 'fahrenheit',
              },
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
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;
