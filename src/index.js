function getData(response) {
  console.log(response);
  let dateTime = document.querySelector("#week-daytime");
  let currentTemperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#city-degree");
  let currentHumidity = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidity");
  let currentWind = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let currentDescription = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  dateTime.innerHTML = daytimeDisplay(response.data.dt * 1000);
  temp.innerHTML = currentTemperature;
  humidity.innerHTML = currentHumidity;
  wind.innerHTML = currentWind;
  description.innerHTML = currentDescription;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = cityInput.value;
  let city = cityName.innerHTML;
  let apiKey = "1a67c303cde05fab7777c56416ba8b91";
  let apiUrl = `https:api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getData);
}

function changeDegreeF(event) {
  event.preventDefault();
  let degreeFunction = document.querySelector("#city-degree");
  degreeFunction.innerHTML = 45;
}
function changeDegreeC(event) {
  event.preventDefault();
  let degreeFunction = document.querySelector("#city-degree");
  degreeFunction.innerHTML = 18;
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

let degreeTypeOne = document.querySelector("#farenheit");
degreeTypeOne.addEventListener("click", changeDegreeF);

let degreeTypeTwo = document.querySelector("#celcius");
degreeTypeTwo.addEventListener("click", changeDegreeC);
