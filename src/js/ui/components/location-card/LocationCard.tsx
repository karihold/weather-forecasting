import { Link } from 'react-router-dom';

import TemperatureLabel from '../unit-labels/TemperatureLabel';

import './LocationCard.scss';

type LocationTypeProps = {
  name: string;
  url: string;
  isCurrentLocation?: boolean;
  temperature: number;
};

const LocationCard = ({ name, url, isCurrentLocation = false, temperature }: LocationTypeProps) => {
  return (
    <Link
      className="location-card"
      to={url}
    >
      {isCurrentLocation ? <span>My Location ({name})</span> : <span>{name}</span>}
      <TemperatureLabel value={temperature} />
    </Link>
  );
};

export default LocationCard;
