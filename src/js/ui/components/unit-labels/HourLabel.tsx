import { convertUnixToHoursAndMinutes } from '../../../utils/time-utils';

import './HourLabel.scss';

type HourLabelProps = {
  value: number;
  colorCode?: 'early' | 'late';
};

const HourLabel = ({ value, colorCode }: HourLabelProps) => {
  const timeValue = convertUnixToHoursAndMinutes(value);

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
