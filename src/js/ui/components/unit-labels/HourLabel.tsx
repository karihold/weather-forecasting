import { convertUtcToHoursAndMinutes } from '../../../utils/time-utils';

import './HourLabel.scss';

type HourLabelProps = {
  value: number;
  colorCode?: 'early' | 'late';
};

const HourLabel = ({ value, colorCode }: HourLabelProps) => {
  const timeValue = convertUtcToHoursAndMinutes(value);

  return (
    <time
      className={`hour-label ${colorCode && colorCode}`}
      dateTime={timeValue}
    >
      {timeValue}
    </time>
  );
};

export default HourLabel;
