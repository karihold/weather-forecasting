import { DistanceUnit, usePersonalization } from '../../../contexts/personalization-context';
import { convertDistance } from '../../../utils/personalization-utils';

import './DistanceLabel.scss';

type DistanceLabelProps = {
  value: number;
};

const DistanceSymbols: { [key in DistanceUnit]: string } = {
  metric: ' km',
  imperial: ' miles',
};

const DistanceLabel = ({ value }: DistanceLabelProps) => {
  const { distanceUnit } = usePersonalization();

  return (
    <span className="distance-label">
      {convertDistance(value, distanceUnit)}
      <span>{DistanceSymbols[distanceUnit]}</span>
    </span>
  );
};

export default DistanceLabel;
