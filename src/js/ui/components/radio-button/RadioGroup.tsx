import RadioButton, { RadioButtonProps } from './RadioButton';

import './RadioGroup.scss';

type RadioGroupProps<T extends string | number> = {
  onChange: (value: T) => void;
  legend: string;
  name: string;
  options: RadioButtonProps<T>[];
};

const RadioGroup = <T extends string | number>({
  legend,
  name,
  onChange,
  options,
}: RadioGroupProps<T>) => {
  return (
    <fieldset
      className="radio-group"
      onChange={(event) => onChange((event.target as HTMLInputElement).value as T)}
    >
      <legend className="radio-group-legend">{legend}</legend>
      {options.map((option, index) => (
        <RadioButton
          key={index}
          name={name}
          {...option}
        />
      ))}
    </fieldset>
  );
};

export default RadioGroup;
