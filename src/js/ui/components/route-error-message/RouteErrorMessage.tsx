import React from 'react';
import { isRouteErrorResponse } from 'react-router-dom';

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

export default RouteErrorMessage;
