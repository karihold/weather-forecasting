import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';

import { useWeather } from '../../../contexts/weather-context';

import './ErrorPage.scss';

const ErrorPage = () => {
  const { resetWeatherError } = useWeather();
  const error = useRouteError();

  console.error(error);

  return (
    <section className="error-page">
      <h1>Woops!</h1>
      <p>An unexcpected error occured</p>
      <RouteErrorMessage error={error} />
      <Link
        to="/"
        onClick={resetWeatherError}
      >
        Go back to dashboard
      </Link>
    </section>
  );
};

const RouteErrorMessage = ({ error }: { error: unknown }) => {
  if (isRouteErrorResponse(error)) {
    return (
      <dl className="error-status-and-text">
        <dt>{error.status}</dt>
        <dd>{error.statusText}</dd>
      </dl>
    );
  }

  if (error instanceof Error) {
    return <p className="error-message">{error.message}</p>;
  }

  if (typeof error === 'string') {
    return <p className="error-message">{error}</p>;
  }

  return <p className="error-message">Unknown Error</p>;
};

export default ErrorPage;
