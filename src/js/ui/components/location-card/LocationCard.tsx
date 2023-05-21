import React from 'react';
import { Link } from 'react-router-dom';

import { TemperatureUnit, usePersonalization } from '../../../contexts/personalization-context';
import DegreeLabel from '../degree-label/DegreeLabel';

type LocationTypeProps = {
  name: string;
  url: string;
  temperature: {
    unit: TemperatureUnit;
    value: number;
  };
};

const LocationCard = ({ name, url, temperature }: LocationTypeProps) => {
  return (
    <Link to={url}>
      <span>{name}</span>
      <DegreeLabel {...temperature} />
    </Link>
  );
};

export default LocationCard;
