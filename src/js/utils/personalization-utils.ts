import { DistanceUnit, TemperatureUnit } from '../contexts/personalization-context';

const STORED_PERSONALIZATION_KEY = 'stored-personalization' as const;

// Celsius set as default in the api calls
export function convertTemperature(value: number, unit: TemperatureUnit) {
  if (unit === 'celsius') {
    return Math.floor(value);
  }

  if (unit === 'fahrenheit') {
    return Math.floor(value * (9 / 5) + 32);
  }

  if (unit === 'kelvin') {
    const kelvinValue = value + 273.15;
    // To make sure that the conversion only contains two decimals at the end
    return Math.floor(kelvinValue * 100) / 100;
  }

  return Math.floor(value);
}

// Meters set to default in api calls
export function convertDistance(value: number, unit: DistanceUnit) {
  // Converting meters to km
  if (unit === 'metric') {
    return value / 1000;
  }

  if (unit === 'imperial') {
    const oneMeterInMiles = 0.000621;

    return value * oneMeterInMiles;
  }

  return value;
}

// Meters per second set to default in api calls
export function convertSpeed(value: number, unit: DistanceUnit) {
  if (unit === 'metric') return value;

  if (unit === 'imperial') {
    const oneMeterPerSecondInMilesPerHour = 2.2369;
    const milesPerHourValue = value * oneMeterPerSecondInMilesPerHour;

    // To make sure that the conversion only contains two decimals at the end
    return Math.floor(milesPerHourValue * 100) / 100;
  }

  return value;
}

// Locale storage
type PersonalizationType = 'temperature' | 'distance';
type StoredPersonalization = {
  temperature: TemperatureUnit;
  distance: DistanceUnit;
};

export function setPersonalizationInLocaleStorage(
  key: PersonalizationType,
  value: TemperatureUnit | DistanceUnit
) {
  const storedPersonalization = getPersonalizationFromLocaleStorage();

  const updatedPersonalization = storedPersonalization
    ? { ...storedPersonalization, [key]: value }
    : { [key]: value };

  localStorage.setItem(STORED_PERSONALIZATION_KEY, JSON.stringify(updatedPersonalization));
}

export function getPersonalizationFromLocaleStorage() {
  const storedPersonalization = localStorage.getItem(STORED_PERSONALIZATION_KEY);

  if (!storedPersonalization) return null;

  return JSON.parse(storedPersonalization) as StoredPersonalization;
}

export function removePersonalizationFromLocaleStorage() {
  localStorage.removeItem(STORED_PERSONALIZATION_KEY);
}
