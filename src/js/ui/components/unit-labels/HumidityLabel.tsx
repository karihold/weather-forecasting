import './HumidityLabel.scss';

type HumidityLabelProps = {
  value: number;
};

const HumidityLabel = ({ value }: HumidityLabelProps) => {
  return (
    <span className="humidity-label">
      {value}
      <span>%</span>
    </span>
  );
};

export default HumidityLabel;
