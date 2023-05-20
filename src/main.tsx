import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { WeatherProvider } from './js/contexts/weather-context';
import Dashboard from './js/ui/pages/dashboard/Dashboard';
import ErrorPage from './js/ui/pages/error-page/ErrorPage';
import LocationDetails from './js/ui/pages/location-details/LocationDetails';

import './index.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'details/:location',
    element: <LocationDetails />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WeatherProvider>
      <RouterProvider router={router} />
    </WeatherProvider>
  </React.StrictMode>
);
