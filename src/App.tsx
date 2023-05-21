import { Outlet, Link, useMatch, useLocation } from 'react-router-dom';

import {
  TemperatureUnit,
  DistanceUnit,
  usePersonalization,
} from './js/contexts/personalization-context';

import { capitalizeFirstLetter } from './js/utils/text-utils';

import RadioGroup from './js/ui/components/radio-button/RadioGroup';

import './App.scss';

const App = () => {
  const location = useLocation();
  const { temperatureUnit, changeTemperatureUnit, distanceUnit, changeDistanceUnit } =
    usePersonalization();

  const isAtDashboard = useMatch('/');
  const isAtDetails = useMatch('/details/:location');

  function getTitle() {
    if (isAtDashboard) {
      return 'Dashboard';
    }

    if (isAtDetails) {
      const slugs = location.pathname.split('/');
      const locationName = slugs[slugs.length - 1];

      return capitalizeFirstLetter(decodeURIComponent(locationName)).replace('-', ' ');
    }

    return 'Dashboard';
  }

  return (
    <>
      <header>
        <div className="main-title-wrapper">
          {!isAtDashboard && (
            <Link
              className="back-link"
              to="/"
            >
              &larr;
            </Link>
          )}
          <h1>{getTitle()}</h1>
        </div>
        <section className="personalization-menu">
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
