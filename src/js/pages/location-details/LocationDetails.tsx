import React from 'react';
import { useParams } from 'react-router-dom';

const LocationDetails = () => {
  const { locationName } = useParams<{ locationName: string }>();
  console.log('Fyrer denne av?');
  return (
    <section>
      <h1>Welcomet to {locationName}</h1>
    </section>
  );
};

export default LocationDetails;