import * as apiFn from './api.js';


const addCityBtn = document.querySelector('.addCity');
const toggleBtn = document.querySelector('.toggler');
const inputBlock = document.querySelector('.new_city')
const dayBlock = document.querySelector('.day')
const dateBlock = document.querySelector('.date')
const timeBlock = document.querySelector('.time')

toggleBtn.addEventListener('click', () => {
  if (inputBlock.style.display === 'none') {
    inputBlock.style.display = 'block';
    toggleBtn.innerHTML = '×'
  }
  else {
    inputBlock.style.display = 'none'
    toggleBtn.innerHTML = '+'
  }
})

function updateDateTime() {
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString('en-US');
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  
  dateBlock.innerHTML = currentDate;
  dayBlock.innerHTML = currentDay;
  timeBlock.innerHTML = currentTime;
}

updateDateTime();
setInterval(updateDateTime, 1000);

async function getNewWeather() {
  let userInputCity = document.querySelector('#city_name').value.trim();
  
  // If user didn't enter a city, fetch location-based city asynchronously
  let cityName = userInputCity || await apiFn.getUserLocation();

  if (!cityName) {
  // console.log("❌ No city detected, using default: Delhi");
    return await apiFn.getUserLocation()
  }

  const cityDetails = document.querySelector('.city_info');
  const currentTemp = document.querySelector('.currentTemp');
  const wCondition = document.querySelector('.weather_condition');
  const aSpeed = document.querySelector('.wind');
  const currentFeel = document.querySelector('.currentFeel');
  const weatherContainer = document.querySelector('.icon');
  const humidity = document.querySelector('.humidity');
  const pressure = document.querySelector('.pressure');
  const radar = document.querySelector('.map-box');

  try {
    const newWeatherData = await apiFn.getWeather(cityName);
    if (!newWeatherData || newWeatherData.cod !== 200) {
      throw new Error(`Weather data not found for ${cityName}`);
    }

    cityDetails.innerHTML = newWeatherData.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    wCondition.innerHTML = `${newWeatherData.weather[0].main}`;
    aSpeed.innerHTML = `${newWeatherData.wind.speed}`;
    currentTemp.innerHTML = `${Math.round(newWeatherData.main.temp - 273.15)}`;
    currentFeel.innerHTML = `${Math.round(newWeatherData.main.feels_like - 273.15)}`;
    weatherContainer.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${newWeatherData.weather[0].icon}@2x.png`
    );
    humidity.innerHTML = `${newWeatherData.main.humidity}`;
    pressure.innerHTML = `${(newWeatherData.main.pressure / 1013.25).toFixed(3)}`;
    radar.src = `https://embed.windy.com/embed2.html?lat=${newWeatherData.coord.lat}&lon=${newWeatherData.coord.lon}&zoom=5&level=surface&overlay=radar&menu=&message=true&type=map&location=coordinates&detail=&detailLat=${newWeatherData.coord.lat}&detailLon=${newWeatherData.coord.lon}&metricWind=default&metricTemp=default&radarRange=-1`;

    //console.log("✅ Weather data:", newWeatherData);
  } catch (e) {
    // console.log("❌ Error fetching weather:", e);
    throw e
  }
}


getNewWeather();

addCityBtn.addEventListener('click', () => {
  const cityInput = document.querySelector('#city_name');
  const messageBoxId = 'city-error-message';
  const weatherContainer = document.querySelector('#current_weather');
  const existingMessage = document.getElementById(messageBoxId);
  if (existingMessage) {
    existingMessage.remove();
  }
  
  if (cityInput.value.trim() === '') {
    const messageBox = document.createElement('p');
    messageBox.id = messageBoxId;
    messageBox.innerHTML = 'Please enter a valid city name';
    messageBox.style.textAlign = 'center';
    messageBox.style.color = '#FF1313';
    messageBox.style.backgroundColor = 'white'
    messageBox.style.fontSize = '14px';
    messageBox.style.fontWeight = '600';
    weatherContainer.prepend(messageBox);
   // console.log('Error: No city entered.');
  } else {
    getNewWeather();
    document.querySelector('.new_city').style.display = 'none';
    document.querySelector('#city_name').value = ''
  }
});


