const BASE_URL = 'http://api.weatherapi.com/v1';
const API_KEY = 'fb9da5dcb2d94ad7ae0224616230808';
const FORECAST_METHOD = '/forecast.json';
const DAYS = '3';
const FORECAST_URL = `${BASE_URL}${FORECAST_METHOD}?key=${API_KEY}&days=${DAYS}&q=`;

export async function getWeather(location) {
  try {
    const response = await fetch(FORECAST_URL + location);
    if (response.ok) {
      return response.json();
    } else {
      const errorMessage = await _getErrorMessage(response);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
}

async function _getErrorMessage(response) {
  const data = await response.json();
  const errorMessage = data.error.message;
  return errorMessage;
}
