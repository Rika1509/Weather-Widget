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
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput.value}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  console.log(response.data.daily);
  let currentForecast = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
        <div class="weather-forecast-date">
          <p>${formatDay(day.time)}</p>
        </div><br /><img src="${day.condition.icon_url}" />
        <br />
        <div class="weather-forecast-temp">
          <span class="weather-forecast-temp-max">${Math.round(
            day.temperature.maximum
          )}°</span><span
              class="weather-forecast-temp-min">${Math.round(
                day.temperature.minimum
              )}°</span>
        </div>
      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  currentForecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let lat = coordinates.latitude;
  let lon = coordinates.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  let currentTemperature = document.querySelector(`.temperature`);
  currentTemperature.innerHTML = `${temperature}`;
  let h1 = document.querySelector(`h1`);
  h1.innerHTML = response.data.city;
  console.log(response.data);

  celsiusTemperature = Math.round(response.data.temperature.current);

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

  getForecast(response.data.coordinates);
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

function showFahrenheitTemp(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector(".temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let currentTemperature = document.querySelector(".temperature");
  currentTemperature.innerHTML = celsiusTemperature;
}

celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

let searchForLocation = document.querySelector(`form`);
searchForLocation.addEventListener(`submit`, submitCity);

let searchForCity = document.querySelector(`button`);
searchForCity.addEventListener(`click`, submitCity);

let SearchforCurrentLocation = document.querySelector(`#current-location`);
SearchforCurrentLocation.addEventListener(`click`, getPosition);

search(`Rome`);
