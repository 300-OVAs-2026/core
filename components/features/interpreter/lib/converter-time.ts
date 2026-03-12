/**
 * Converts total seconds into an object with hours, minutes and seconds.
 * @param {number} time - Total seconds to convert
 * @returns {object} - Object containing hours, minutes and seconds
 */
export const convertTime = (time: number): { hours: string; minutes: string; seconds: string } => {
  // Calculate hours, minutes and seconds
  const hours = Math.floor(time / 3600)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((time % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, '0');

  return { hours, minutes, seconds };
};

/**
 * Formats total seconds into a time string.
 * @param {number} time - Total seconds to format
 * @returns {string} - Time string in 'hh:mm:ss' or 'mm:ss' format
 */
export const formatTime = (time: number): string => {
  const { hours, minutes, seconds } = convertTime(time);

  // Check if hours are zero, if so, return time string in 'mm:ss' format
  return hours === '00' ? `${minutes}:${seconds}` : `${hours}:${minutes}:${seconds}`;
};

/**
 * Converts total seconds into a user-friendly time string.
 * @param {number} time - Total seconds to format
 * @returns {string} - Time string in 'x hour/s, y minute/s and z second/s' format
 */
export const formatTimeToString = (time: number) => {
  const { hours, minutes, seconds } = convertTime(time);
  return `${hours !== '00' ? `${hours} horas, ` : ''}${minutes} minutos y ${seconds} segundos`;
};
