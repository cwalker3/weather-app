import { getWeather } from './weather-fetcher';
import { forecast } from './forecast';

export const domController = (function () {
  const locationForm = document.querySelector('.location-form');
  const locationInput = document.querySelector('#location');
  const loading = document.querySelector('.loading');
  const tempPreviews = document.querySelectorAll('.preview');
  const twoDays = document.querySelector('.two-days');
  const previewImgs = document.querySelectorAll('.preview-img');

  document.addEventListener('DOMContentLoaded', () => {
    _initializeEventListeners();
    _initializeLocation();
    _updateDay();
  });

  function _initializeEventListeners() {
    locationForm.addEventListener('submit', _handleFormSubmission);
  }

  async function _handleFormSubmission(e) {
    e.preventDefault();
    loading.classList.remove('hidden');
    try {
      const location = locationInput.value;
      const data = await getWeather(location);
      forecast.setData(data);
      _initializeForecastDisplay();
    } catch (error) {
      _handleError(error);
    } finally {
      loading.classList.add('hidden');
    }
  }

  function _handleError(error) {
    console.log(error.message);
  }

  function _initializeForecastDisplay() {
    _updatePreviews();
  }

  function _updatePreviews() {
    for (let i = 0; i < tempPreviews.length; i++) {
      let previewString = '';
      let conditionImg = '';
      if (i == 0) {
        previewString = forecast.currentTemp();
        conditionImg = forecast.currentConditionImg();
      } else {
        previewString = forecast.highLow(i - 1);
        conditionImg = forecast.conditionImg(i - 1);
      }
      tempPreviews[i].textContent = previewString;
      previewImgs[i].src = conditionImg;
    }
  }

  function _initializeLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(_submitLocation);
    }
  }

  function _submitLocation(location) {
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;
    locationInput.value = `${latitude}, ${longitude}`;
    locationForm.requestSubmit();
  }

  function _updateDay() {
    const currentDate = new Date();
    const twoDaysFromNow = new Date(currentDate);
    twoDaysFromNow.setDate(currentDate.getDate() + 2);
    const dayIndex = twoDaysFromNow.getDay();
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    twoDays.textContent = days[dayIndex];
  }
})();
