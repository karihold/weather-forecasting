import React, { ChangeEvent } from 'react';

export type RadioButtonProps<T extends string | number> = {
  label: string;
  name?: string;
  value: T;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean;
};

const RadioButton = <T extends string | number>({
  label,
  name,
  value,
  onChange,
  isChecked,
}: RadioButtonProps<T>) => {
  return (
    <label>
      {label}
      <input
        name={name}
        type="radio"
        value={value}
        onChange={onChange}
        checked={isChecked}
        readOnly={!onChange}
      />
    </label>
  );
};

export default RadioButton;
