import { TemperatureUnit, usePersonalization } from '../../../contexts/personalization-context';
import { convertTemperature } from '../../../utils/personalization-utils';

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

  // Temperature value and html degree symbol code (&#176;)
  return (
    <span>
      {convertTemperature(value, temperatureUnit)}
      <span>{TemperatureUnitSymbols[temperatureUnit]}&#176;</span>
    </span>
  );
};

export default TemperatureLabel;
