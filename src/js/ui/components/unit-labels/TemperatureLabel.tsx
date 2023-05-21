import { TemperatureUnit, usePersonalization } from '../../../contexts/personalization-context';
import {
  convertTemperature,
  isTemperatureAtFreezingPoint,
} from '../../../utils/personalization-utils';

import './TemperatureLabel.scss';

type TemperatureLabelProps = {
  value: number;
  unit?: TemperatureUnit;
};

const TemperatureUnitSymbols: { [key in TemperatureUnit]: string } = {
  celsius: 'C',
  fahrenheit: 'F',
  kelvin: 'K',
};

const TemperatureLabel = ({ value }: TemperatureLabelProps) => {
  const { temperatureUnit } = usePersonalization();
  const temperature = convertTemperature(value, temperatureUnit);

  // Temperature value and html degree symbol code (&#176;)
  return (
    <span
      className={`temperature-label ${
        isTemperatureAtFreezingPoint(temperature, temperatureUnit) && 'freezing'
      }`}
    >
      {temperature}
      <span>{TemperatureUnitSymbols[temperatureUnit]}&#176;</span>
    </span>
  );
};

export default TemperatureLabel;
