import { convertUtcToHoursAndMinutes } from '../../../utils/time-utils';

type HourLabelProps = {
  value: number;
};

const HourLabel = ({ value }: HourLabelProps) => {
  const timeValue = convertUtcToHoursAndMinutes(value);

  return <time dateTime={timeValue}>{timeValue}</time>;
};

export default HourLabel;
