import './LoadSpinner.scss';

type LoadSpinnerProps = {
  label?: string;
};

const LoadSpinner = ({ label }: LoadSpinnerProps) => {
  return (
    <div className="load-spinner-container">
      {label && (
        <p className="load-spinner-label">
          <em>{label}</em>
        </p>
      )}
      <div
        className="load-spinner"
        role="presentation"
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadSpinner;
