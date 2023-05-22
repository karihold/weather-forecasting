import { useState } from 'react';

import './InputForm.scss';

type InputFormProps = {
  onSubmit: (value: string) => void | Promise<void>;
  submitLabel: string;
};

const InputForm = ({ onSubmit, submitLabel = 'Submit' }: InputFormProps) => {
  const [value, setValue] = useState<string>('');

  return (
    <form
      className="input-form"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(value);
        setValue('');
      }}
    >
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button
        type="submit"
        disabled={!value}
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default InputForm;
