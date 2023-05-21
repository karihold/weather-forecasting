import { DistanceUnit, usePersonalization } from '../../../contexts/personalization-context';
import { convertSpeed } from '../../../utils/personalization-utils';

type SpeedLabelProps = {
  value: number;
};

const SpeedSymbols: { [key in DistanceUnit]: string } = {
  metric: 'm/s',
  imperial: 'mph',
};

const SpeedLabel = ({ value }: SpeedLabelProps) => {
  const { distanceUnit } = usePersonalization();

  return (
    <span>
      {convertSpeed(value, distanceUnit)}
      <span>{SpeedSymbols[distanceUnit]}</span>
    </span>
  );
};

export default SpeedLabel;
