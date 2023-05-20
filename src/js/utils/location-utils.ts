export const CURRENT_LOCATION_KEY = 'current-location' as const;

export function getCurrentLocation() {
  if (hasCurrentLocationInStorage()) return;

  navigator.geolocation.getCurrentPosition(onGetLocationSuccess, onGetLocationError);
}

function onGetLocationSuccess(position: GeolocationPosition) {
  console.log(position);

  setCurrentLocationInLocalStorage(position);
}

function onGetLocationError(error: GeolocationPositionError) {
  console.log(error);

  throw new Error('Unable to retrieve your current location');
}

type CurrentCoordinates = {
  lat: number;
  lon: number;
};

// Locale storage
export function setCurrentLocationInLocalStorage({ coords }: GeolocationPosition) {
  localStorage.setItem(
    CURRENT_LOCATION_KEY,
    JSON.stringify({ lat: coords.latitude, lon: coords.longitude })
  );
}

export function getCurrentLocationFromLocalStorage(): CurrentCoordinates {
  const coordinates = localStorage.getItem(CURRENT_LOCATION_KEY);

  if (!coordinates) return {} as CurrentCoordinates;

  return JSON.parse(coordinates);
}

export function removeCurrentLocationFromLocaleStorage() {
  localStorage.removeItem(CURRENT_LOCATION_KEY);
}

export function hasCurrentLocationInStorage() {
  return localStorage.getItem(CURRENT_LOCATION_KEY) !== null;
}
