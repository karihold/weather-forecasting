import React from 'react';
import { Link } from 'react-router-dom';

type LocationTypeProps = {
  name: string;
  temperature: number;
};

const LocationCard = ({ name, temperature }: LocationTypeProps) => {
  const locationSlug = name.toLocaleLowerCase().replace(/\s/gm, '');

  return (
    <Link to={`location/${locationSlug}`}>
      <span>{name}</span>
      <span>{temperature}</span>
    </Link>
  );
};

export default LocationCard;
