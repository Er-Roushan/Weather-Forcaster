const api = {
  key: "4982cbdf8a60f7454c8abe9fff8565bd",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Weathersearch = document.querySelector(".weather-search input");
Weathersearch.addEventListener("keyup", query);
const button = document.querySelector(".btn");

button.addEventListener("click", function () {
  getWeather(Weathersearch.value);
  Weathersearch.value = "";
});

function query(event) {
  if (event.keyCode == 13) {
    console.log(Weathersearch.value);
    getWeather(Weathersearch.value);

    Weathersearch.value = "";
  }
}

function getWeather(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then((response) => {
      if (!response.ok) {
        alert("No Weather Found");
        throw new Error("No Weather Found");
      }
      return response.json();
    })
    .then(displayWeather);
}

function displayWeather(data) {
  console.log(data);
  const city = document.querySelector(".city-name");
  city.innerText = `Weather in ${data.name}`;
  console.log(city);

  const icon = document.querySelector(".weather-icon");
  icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const temperature = document.querySelector(".temperature");
  temperature.innerText = `${data.main.temp} °C`;

  const description = document.querySelector(".description");
  description.innerText = `${data.weather[0].description}`;

  const humidity = document.querySelector(".humidity");
  humidity.innerText = `Humidity : ${data.main.humidity} %`;
  const wind = document.querySelector(".wind");
  wind.innerText = `Wind Speed : ${data.wind.speed}  km/h`;
  const display = document.querySelector(".weather-display");
  display.classList.remove("loading");
  document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${data.weather[0].description}')`;
}

function reverseGeocode(latitude, longitude) {
  var apikey = "1637a4fe37e84959a6fc26a7dfa001fc";
  var api_url = "https://api.opencagedata.com/geocode/v1/json";
  var request_url =
    api_url +
    "?" +
    "key=" +
    apikey +
    "&q=" +
    encodeURIComponent(latitude + "," + longitude) +
    "&pretty=1" +
    "&no_annotations=1";
  var request = new XMLHttpRequest();
  request.open("GET", request_url, true);

  request.onload = function () {
    if (request.status === 200) {
      var data = JSON.parse(request.responseText);
      getWeather(data.results[0].components.city);
    } else if (request.status <= 500) {
      alert("unable to geocode! Response code: " + request.status);
      var data = JSON.parse(request.responseText);
      alert("error msg: " + data.status.message);
    } else {
      alert("server error");
    }
  };
  request.onerror = function () {
    alert("unable to connect to server");
  };

  request.send();
}

function getlocation() {
  function success(data) {
    reverseGeocode(data.coords.latitude, data.coords.longitude);
  }
  function error() {
    alert("Click Allow Button to Get Weather Details");
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

getlocation();
