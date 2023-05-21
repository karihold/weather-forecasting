import React from 'react';

import { TemperatureUnit } from '../../../contexts/personalization-context';

type DegreeLabelProps = {
  value: number;
  unit: TemperatureUnit;
};

const TemperatureUnitSymbols: { [key in TemperatureUnit]: string } = {
  celsius: 'C',
  fahrenheit: 'F',
  kelvin: 'K',
};

const DegreeLabel = ({ value, unit }: DegreeLabelProps) => {
  // Temperature value and html degree symbol code (&#176;)
  return (
    <span>
      {value}
      {TemperatureUnitSymbols[unit]}&#176;
    </span>
  );
};

export default DegreeLabel;
