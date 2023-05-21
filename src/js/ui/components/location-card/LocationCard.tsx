import { Link } from 'react-router-dom';

import TemperatureLabel from '../unit-labels/TemperatureLabel';

type LocationTypeProps = {
  name: string;
  url: string;
  isCurrentLocation?: boolean;
  temperature: number;
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
      <TemperatureLabel value={temperature} />
    </Link>
  );
};

export default LocationCard;
