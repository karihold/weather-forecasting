import { ChangeEvent } from 'react';

import './RadioButton.scss';

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
    <label className="radio-label">
      <input
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
