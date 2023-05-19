type Weather = {
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
};

export async function getWeatherData(): Promise<Weather> {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${
      import.meta.env.VITE_WEATHER_KEY
    }`
  );

  if (!response.ok) throw new Error('Unable to fetch weather data');

  const data = await response.json();
  console.log(response);

  return data;
}
