import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  console.error(error);

  return (
    <section>
      <h1>Woops!</h1>
      <p>An unexcpected error occured</p>
      <RouteErrorMessage error={error} />
    </section>
  );
};

const RouteErrorMessage = ({ error }: { error: unknown }) => {
  if (isRouteErrorResponse(error)) {
    return (
      <dl>
        <dt>{error.status}</dt>
        <dd>{error.statusText}</dd>
      </dl>
    );
  }

  if (error instanceof Error) {
    return <p>{error.message}</p>;
  }

  if (typeof error === 'string') {
    return <p>{error}</p>;
  }

  return <p>Unknown Error</p>;
};

export default ErrorPage;
