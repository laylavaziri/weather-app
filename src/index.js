let currentTemperature = "--";

currentTemperature;
function getTempData(response) {
  currentTemperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#city-degree");
  temp.innerHTML = currentTemperature;
}

function displayForecast(response) {
  console.log(daytimeDisplay(response.data.list[0].dt * 1000));
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecastIcon = "";
  tempMax = "";
  tempMin = "";
  let todayNumber = new Date().getDay();
  let dayNumber = todayNumber;
  let forecastDay = 0;
  let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  weekdays.forEach(function (day) {
    while (forecastDay < 5) {
      day = weekdays[dayNumber];

      forecastHTML =
        forecastHTML +
        `
  <div class="col-2">
              <div class="forecast-day">${day}</div>
              <div class="forecast-icon">${forecastIcon}</div>
              <div class="forecast-temp">
                ${tempMax}° <span class="min-temp">${tempMin}°</span>
              </div>
            </div>`;
      if (dayNumber < 6) {
        dayNumber = dayNumber + 1;
      } else {
        dayNumber = 0;
      }
      forecastDay = forecastDay + 1;
    }
  });
  forecastDay = forecastDay + 1;

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getData(response) {
  let locationElement = document.querySelector(`#city-name`);
  let country = response.data.sys.country;
  let city = locationElement.textContent;
  let location = city;
  if (city.includes(", ")) {
    location = location;
  } else {
    location = `${city}, ${country}`;
  }
  locationElement.innerHTML = location;
  let dateTime = document.querySelector("#week-daytime");
  let currentHumidity = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidity");
  let currentWind = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let currentDescription = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  dateTime.innerHTML = daytimeDisplay(response.data.dt * 1000);
  humidity.innerHTML = currentHumidity;
  wind.innerHTML = currentWind;
  description.innerHTML = currentDescription;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;
  let apiKey = "842b36d55cb28eba74a018029d56b04c";
  let cnt = 0;
  forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(forecastApiUrl).then(displayForecast);
  console.log(forecastApiUrl);
}
function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = cityInput.value;
  let city = cityName.innerHTML;
  let apiKey = "1a67c303cde05fab7777c56416ba8b91";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getData);
  axios.get(apiUrl).then(getTempData);
  degreeTypeCelcius.classList.remove("active");
}

function changeDegreeF(event) {
  event.preventDefault();
  let degreeFunction = document.querySelector("#city-degree");
  degreeTypeFarenheit.classList.remove("active");
  degreeTypeCelcius.classList.add("active");
  if (currentTemperature != "--") {
    degreeFunction.innerHTML = Math.round((currentTemperature * 9) / 5 + 32);
  } else degreeFunction.innerHTML = "--";
}
function changeDegreeC(event) {
  event.preventDefault();
  let degreeFunction = document.querySelector("#city-degree");
  degreeTypeCelcius.classList.remove("active");
  degreeTypeFarenheit.classList.add("active");
  degreeFunction.innerHTML = currentTemperature;
}

function daytimeDisplay(timestamp) {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let timeNow = new Date(timestamp);
  let weekday = weekDays[timeNow.getDay()];
  let hour = timeNow.getHours();
  let minute = timeNow.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let daytimeDisplay = `${weekday} ${hour}:${minute}`;

  return daytimeDisplay;
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", changeCity);

let degreeTypeFarenheit = document.querySelector("#farenheit");
degreeTypeFarenheit.addEventListener("click", changeDegreeF);

let degreeTypeCelcius = document.querySelector("#celcius");
degreeTypeCelcius.addEventListener("click", changeDegreeC);
