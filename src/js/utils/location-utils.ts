export const CURRENT_LOCATION_KEY = 'current-location' as const;
export const STORED_LOCATIONS_KEY = 'stored-locations' as const;

export type CurrentCoordinates = {
  lat: number;
  lon: number;
};

export async function getCurrentLocation(): Promise<CurrentCoordinates> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(onGetLocationSuccess(position)),
      (error) => reject(onGetLocationError(error))
    );
  });
}

function onGetLocationSuccess(position: GeolocationPosition) {
  return { lat: position.coords.latitude, lon: position.coords.longitude };
}

function onGetLocationError(error: GeolocationPositionError) {
  console.log(error);

  return new Error(
    'Unable to retrieve your current location. You must allow this device to access your location.'
  );
}

// Current location for locale storage
export function setCurrentLocationInLocalStorage(coordinates: CurrentCoordinates) {
  localStorage.setItem(CURRENT_LOCATION_KEY, JSON.stringify(coordinates));
}

export function getCurrentLocationFromLocalStorage(): CurrentCoordinates | null {
  const coordinates = localStorage.getItem(CURRENT_LOCATION_KEY);

  if (!coordinates) return null;

  return JSON.parse(coordinates);
}

export function removeCurrentLocationFromLocaleStorage() {
  localStorage.removeItem(CURRENT_LOCATION_KEY);
}

export function hasCurrentLocationInLocaleStorage() {
  const locationFromStorage = getCurrentLocationFromLocalStorage();

  return locationFromStorage !== null;
}

// Locations for locale storage

export function setLocationInLocaleStorage(location: string) {
  const currentlyStoredLocations = getLocationsFromLocaleStorage();

  const locationsToStore = currentlyStoredLocations
    ? [...currentlyStoredLocations, location]
    : [location];

  localStorage.setItem(STORED_LOCATIONS_KEY, JSON.stringify(locationsToStore));
}

export function getLocationsFromLocaleStorage() {
  const coordinates = localStorage.getItem(STORED_LOCATIONS_KEY);

  if (!coordinates) return null;

  return JSON.parse(coordinates);
}

export function removeLocationsFromLocaleStorage() {
  localStorage.removeItem(STORED_LOCATIONS_KEY);
}
