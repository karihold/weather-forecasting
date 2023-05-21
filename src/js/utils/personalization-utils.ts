import { DistanceUnit, TemperatureUnit } from '../contexts/personalization-context';

const STORED_PERSONALIZATION_KEY = 'stored-personalization' as const;

// Celsius set as default in the api calls
export function convertTemperature(value: number, unit: TemperatureUnit) {
  if (unit === 'celsius') return value;

  if (unit === 'fahrenheit') {
    return value * (9 / 5) + 32;
  }

  if (unit === 'kelvin') {
    return value + 273.15;
  }

  return value;
}

// Metric set to default in api calls
export function convertMetric(value: number, unit: DistanceUnit) {
  if (unit === 'metric') return value;

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
