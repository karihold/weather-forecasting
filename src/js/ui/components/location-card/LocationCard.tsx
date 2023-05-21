import React from 'react';
import { Link } from 'react-router-dom';

import { TemperatureUnit, usePersonalization } from '../../../contexts/personalization-context';
import DegreeLabel from '../degree-label/DegreeLabel';

type LocationTypeProps = {
  name: string;
  url: string;
  isCurrentLocation?: boolean;
  temperature: {
    unit: TemperatureUnit;
    value: number;
  };
};

const LocationCard = ({ name, url, isCurrentLocation = false, temperature }: LocationTypeProps) => {
  return (
    <Link to={url}>
      {isCurrentLocation ? (
        <>
          <span>My Location</span>
          <span>({name})</span>
        </>
      ) : (
        <span>{name}</span>
      )}
      <DegreeLabel {...temperature} />
    </Link>
  );
};

export default LocationCard;
