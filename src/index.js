function formatDate(date) {
  let now = new Date();

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let currentDate = `${day}, ${hours}:${minutes}`;

  return currentDate;
}

document.getElementById("date").innerHTML = formatDate();

let apiKey = `a606oe7b016d122f0t18d2431534646a`;

function submitCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector(`#city-input`);
  let h1 = document.querySelector(`h1`);
  h1.innerHTML = `${cityInput.value}`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput.value}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  let currentTemperature = document.querySelector(`.temperature`);
  currentTemperature.innerHTML = `${temperature}`;
  let h1 = document.querySelector(`h1`);
  h1.innerHTML = response.data.city;
  console.log(response.data);

  let description = response.data.condition.description;
  let weatherDescription = document.querySelector(`#weather-description`);
  weatherDescription.innerHTML = `${description}`;

  let humidity = response.data.temperature.humidity;
  let currentHumidity = document.querySelector(`#humidity`);
  currentHumidity.innerHTML = `${humidity}`;

  let speed = response.data.wind.speed;
  let currentWindSpeed = document.querySelector(`#wind`);
  currentWindSpeed.innerHTML = `${speed}`;

  let pressure = response.data.temperature.pressure;
  let currentPressure = document.querySelector(`#pressure`);
  currentPressure.innerHTML = `${pressure}`;

  let icon = response.data.condition.icon;
  let currentWeatherIcon = document.querySelector(`#icon`);
  currentWeatherIcon.setAttribute(
    `src`,
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${icon}.png`
  );
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);
  let apiKey = `a606oe7b016d122f0t18d2431534646a`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function search(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

let searchForLocation = document.querySelector(`form`);
searchForLocation.addEventListener(`submit`, submitCity);

let searchForCity = document.querySelector(`button`);
searchForCity.addEventListener(`click`, submitCity);

let SearchforCurrentLocation = document.querySelector(`#current-location`);
SearchforCurrentLocation.addEventListener(`click`, getPosition);

search(`Rome`);
