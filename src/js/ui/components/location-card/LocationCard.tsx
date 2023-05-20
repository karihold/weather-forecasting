import React from 'react';
import { Link } from 'react-router-dom';

type LocationTypeProps = {
  name: string;
  url: string;
  temperature: number;
};

const LocationCard = ({ name, url, temperature }: LocationTypeProps) => {
  return (
    <Link to={url}>
      <span>{name}</span>
      <span>{temperature}</span>
    </Link>
  );
};

export default LocationCard;
