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

function getData(response) {
  console.log(response);
  let currentTemperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#city-degree");
  let currentHumidity = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidity");
  let currentWind = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  temp.innerHTML = currentTemperature;
  humidity.innerHTML = currentHumidity;
  wind.innerHTML = currentWind;
}

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityName = document.querySelector("#city-name");
  console.log(cityInput.value);
  cityName.innerHTML = cityInput.value;
  let city = cityName.innerHTML;
  console.log(city);
  let apiKey = "bc5ca568ee2d7c71357ca430a3ff8705";
  let apiUrl = `https:api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getData);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", changeCity);

let degreeTypeOne = document.querySelector("#farenheit");
degreeTypeOne.addEventListener("click", changeDegreeF);

let degreeTypeTwo = document.querySelector("#celcius");
degreeTypeTwo.addEventListener("click", changeDegreeC);

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let timeNow = new Date();
let weekday = weekDays[timeNow.getDay()];
let hour = timeNow.getHours();
let minute = timeNow.getMinutes();

let weekdayChange = document.querySelector("#week-day");
weekdayChange.innerHTML = weekday;

let hourChange = document.querySelector("#hour");
hourChange.innerHTML = hour;

let minuteChange = document.querySelector("#minute");
minuteChange.innerHTML = minute;
