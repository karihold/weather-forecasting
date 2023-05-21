import { Link } from 'react-router-dom';

import TemperatureLabel from '../unit-labels/TemperatureLabel';

import './LocationLink.scss';

type LocationLinkProps = {
  name: string;
  url: string;
  isCurrentLocation?: boolean;
  temperature: number;
};

const LocationLink = ({ name, url, isCurrentLocation = false, temperature }: LocationLinkProps) => {
  return (
    <Link
      className="location-link"
      to={url}
    >
      {isCurrentLocation ? <span>My Location ({name})</span> : <span>{name}</span>}
      <TemperatureLabel value={temperature} />
    </Link>
  );
};

export default LocationLink;
