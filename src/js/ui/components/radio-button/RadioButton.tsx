import { ChangeEvent } from 'react';

import './RadioButton.scss';

export type RadioButtonProps<T extends string | number> = {
  id?: string;
  label: string;
  name?: string;
  value: T;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean;
};

const RadioButton = <T extends string | number>({
  id,
  label,
  name,
  value,
  onChange,
  isChecked,
}: RadioButtonProps<T>) => {
  const inputId = id ? id : `${name}-${value}`;

  return (
    <label
      className="radio-label"
      htmlFor={inputId}
    >
      <input
        id={inputId}
        className="radio-button"
        name={name}
        type="radio"
        value={value}
        onChange={onChange}
        checked={isChecked}
        readOnly={!onChange}
      />
      {label}
    </label>
  );
};

export default RadioButton;
