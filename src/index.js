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

let apiKey = `866a208a73eeff02182218e9441647a1`;

function submitCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector(`#city-input`);
  let h1 = document.querySelector(`h1`);
  h1.innerHTML = `${cityInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector(`.temperature`);
  currentTemperature.innerHTML = `${temperature}`;
  let h1 = document.querySelector(`h1`);
  h1.innerHTML = response.data.name;

  let description = response.data.weather[0].main;
  let weatherDescription = document.querySelector(`#weather-description`);
  weatherDescription.innerHTML = `${description}`;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);
  let apiKey = `3499ef150985eccadd080ff408a018df`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

let searchForLocation = document.querySelector(`form`);
searchForLocation.addEventListener(`submit`, submitCity);

let searchForCity = document.querySelector(`button`);
searchForCity.addEventListener(`click`, submitCity);

let SearchforCurrentLocation = document.querySelector(`#current-location`);
SearchforCurrentLocation.addEventListener(`click`, getPosition);

search(`Rome`);
