export type Weather = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
  isCurrentPosition?: boolean;
};

export async function getWeatherForLocation(location: string): Promise<Weather> {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${
      import.meta.env.VITE_WEATHER_KEY
    }`
  );

  if (!response.ok) throw new Error(`Unable to get weather for ${location}`);

  const data = await response.json();

  return data;
}

export async function getWeatherForCoordinates(lat: number, lon: number): Promise<Weather> {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${
      import.meta.env.VITE_WEATHER_KEY
    }`
  );

  if (!response.ok) throw new Error(`Unable to get weather for lat: ${lat} lon: ${lon}`);

  const data = await response.json();

  return data;
}

export async function getWeatherForMultipleLocations(
  locations: string[] | readonly string[]
): Promise<Weather[]> {
  const allWeatherData = locations.map(async (location) => await getWeatherForLocation(location));

  return Promise.all(allWeatherData);
}
