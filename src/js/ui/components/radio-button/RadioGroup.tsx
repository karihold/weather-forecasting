import React from 'react';

import RadioButton, { RadioButtonProps } from './RadioButton';

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
    <fieldset onChange={(event) => onChange((event.target as HTMLInputElement).value as T)}>
      <legend>{legend}</legend>
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
