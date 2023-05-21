type HumidityLabelProps = {
  value: number;
};

const HumidityLabel = ({ value }: HumidityLabelProps) => {
  return (
    <span>
      {value}
      <span>%</span>
    </span>
  );
};

export default HumidityLabel;
