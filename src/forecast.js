export const forecast = (function () {
  let data = null;
  let tempUnit = 'f';

  function setData(newData) {
    data = newData;
  }

  function forecastDay(day) {
    return data.forecast.forecastday[day];
  }

  function currentTemp() {
    const tempProperty = `temp_${tempUnit}`;
    const temp = data.current[tempProperty];
    const tempInt = Math.floor(temp);

    return tempInt + '°';
  }

  function currentConditionImg() {
    return data.current.condition.icon;
  }

  function highLow(day) {
    const highProperty = `maxtemp_${tempUnit}`;
    const lowProperty = `mintemp_${tempUnit}`;
    const high = forecastDay(day).day[highProperty];
    const low = forecastDay(day).day[lowProperty];
    const highInt = Math.floor(high);
    const lowInt = Math.floor(low);

    return `${highInt}° / ${lowInt}°`;
  }

  function conditionImg(day) {
    return forecastDay(day).day.condition.icon;
  }

  return {
    data,
    setData,
    currentTemp,
    currentConditionImg,
    highLow,
    conditionImg,
  };
})();
