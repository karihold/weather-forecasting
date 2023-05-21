import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { WeatherProvider } from './js/contexts/weather-context';
import { PersonalizationProvider } from './js/contexts/personalization-context';

import App from './App';
import Dashboard from './js/ui/pages/dashboard/Dashboard';
import ErrorPage from './js/ui/pages/error-page/ErrorPage';
import LocationDetails from './js/ui/pages/location-details/LocationDetails';

import './index.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'details/:location',
        element: <LocationDetails />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PersonalizationProvider>
      <WeatherProvider>
        <RouterProvider router={router} />
      </WeatherProvider>
    </PersonalizationProvider>
  </React.StrictMode>
);
