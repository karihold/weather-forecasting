import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Dashboard from './js/pages/dashboard/Dashboard';
import ErrorPage from './js/pages/error-page/ErrorPage';

import './index.scss';

const router = createBrowserRouter([
  { path: '/', element: <Dashboard />, errorElement: <ErrorPage /> },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
