import React from 'react';
import { useRouteError } from 'react-router-dom';

import RouteErrorMessage from '../../components/route-error-message/RouteErrorMessage';

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

export default ErrorPage;
