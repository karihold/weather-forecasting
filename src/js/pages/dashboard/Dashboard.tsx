import React, { useEffect } from 'react';

import { getWeatherData } from '../../services/weather-services';

const Dashboard = () => {
  useEffect(() => {
    getWeatherData().then((data) => console.log(data));
  }, []);

  return <section></section>;
};

export default Dashboard;
