import { getWeather } from './weather-fetcher';

export const domController = (function () {
  const locationForm = document.querySelector('.location-form');
  const locationInput = document.querySelector('.location');
  const loading = document.querySelector('.loading');

  document.addEventListener('DOMContentLoaded', _addEventListeners);

  function _addEventListeners() {
    locationForm.addEventListener('submit', _handleFormSubmission);
  }

  async function _handleFormSubmission(e) {
    e.preventDefault();
    loading.classList.remove('hidden');
    try {
      const location = locationInput.value;
      const forecast = await getWeather(location);
      _displayForecast(forecast);
    } catch (error) {
      _handleError(error);
    } finally {
      loading.classList.add('hidden');
    }
  }

  function _handleError(error) {
    console.log(error.message);
  }

  function _displayForecast(forecast) {
    console.log(forecast);
  }
})();
