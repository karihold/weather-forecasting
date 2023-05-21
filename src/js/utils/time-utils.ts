export function convertUtcToHoursAndMinutes(utc: number) {
  const date = new Date(utc * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours < 10 ? 0 : ''}${hours}:${minutes < 10 ? 0 : ''}${minutes}`;
}
