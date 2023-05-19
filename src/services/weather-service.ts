export async function getWeatherData(): Promise<any> {
  const response = await fetch(
    ` 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=${
      import.meta.env.VITE_WEATHER_KEY
    }`
  );

  if (!response.ok) throw new Error('Unable to fetch weather data');

  const data = await response.json();

  return data;
}
