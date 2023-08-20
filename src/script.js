function main() {
  // Fetch Function called axiosGo
  function axiosGo(city, units) {
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
    let apiKey = "e450bc345a80a08ada69fd5c714d871d";
    let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showWeather);
    axios.get(apiUrl).then(showDate);
    axios.get(apiUrl).catch(function (error) {
      alert("Please Enter a Valid City name");
      document.querySelector("#locationInput").value = "";
    });
  }
  // Function #1 that uses ---"Axios Response"--- after the apiUrl is built in anyway
  function showWeather(response) {
    document.querySelector("h1").innerHTML = response.data.name;
    document.querySelector(
      "#description"
    ).innerHTML = `${response.data.weather[0].description}`;
    document.querySelector(".temp").innerHTML = `${Math.round(
      response.data.main.temp
    )}`;
    document
      .querySelector(".weather-image")
      .setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );
    document.querySelector(".humidity").innerHTML = ` ${Math.round(
      response.data.main.humidity
    )}%`;
    document.querySelector(".windSpeed").innerHTML = `${Math.round(
      response.data.wind.speed
    )}`;
    document.querySelector(".minTemp").innerHTML = ` ${Math.round(
      response.data.main.temp_min
    )}`;
    document.querySelector(".maxTemp").innerHTML = `${Math.round(
      response.data.main.temp_max
    )} `;
  }

  // Setting Current Day and Time showDate function using ---"Axios Response"---
  function showDate(response) {
    let currentDate = new Date(response.data.dt * 1000);
    let weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    if (currentDate.getMinutes() > 9) {
      document.querySelector(".currentDate").innerHTML = `${
        weekDays[currentDate.getDay()]
      }    ${currentDate.getHours()}:${currentDate.getMinutes()}`;
    } else {
      document.querySelector(".currentDate").innerHTML = `${
        weekDays[currentDate.getDay()]
      }    ${currentDate.getHours()}:0${currentDate.getMinutes()}`;
    }
  }
  //Generated Api Url Using form location Input for city ---  User Action
  document.querySelector(".inputCity").addEventListener("submit", (event) => {
    event.preventDefault();
    if (document.querySelector("#locationInput").value.length === 0) {
      alert("Please type a city name !!");
    } else {
      cityName = document.querySelector("#locationInput").value;
    }

    let unit = "metric";
    axiosGo(cityName, unit);
  });

  //2 ---Default Api Url at page start
  let unit = "metric";
  let cityName = "New York";

  //4 ---Default Page Loading view
  document.querySelector("h1").innerHTML = cityName;
  axiosGo(cityName, unit);

  //Unit change based on User's Request
  function classSwitcher(cl1, cl2) {
    document.querySelectorAll(cl2)[0].classList.remove("linked");
    document.querySelectorAll(cl2)[1].classList.remove("linked");
    document.querySelectorAll(cl2)[2].classList.remove("linked");
    document.querySelectorAll(cl1)[0].classList.add("linked");
    document.querySelectorAll(cl1)[1].classList.add("linked");
    document.querySelectorAll(cl1)[2].classList.add("linked");
  }
  function changeTempToFor() {
    axiosGo(cityName, "imperial");
    classSwitcher(".celcius", ".foreign");
    document.querySelector(".speedUnit").innerHTML = "mp/h";
  }

  document
    .querySelectorAll(".foreign")[0]
    .addEventListener("click", changeTempToFor);
  document
    .querySelectorAll(".foreign")[1]
    .addEventListener("click", changeTempToFor);
  document
    .querySelectorAll(".foreign")[2]
    .addEventListener("click", changeTempToFor);

  function changeTempToCel() {
    axiosGo(cityName, "metric");
    classSwitcher(".foreign", ".celcius");
    document.querySelector(".speedUnit").innerHTML = "km/h";
  }

  document
    .querySelectorAll(".celcius")[0]
    .addEventListener("click", changeTempToCel);
  document
    .querySelectorAll(".celcius")[1]
    .addEventListener("click", changeTempToCel);
  document
    .querySelectorAll(".celcius")[2]
    .addEventListener("click", changeTempToCel);

  /*
  document.querySelectorAll(".linked").addEventListener("click", () => {
    if (document.querySelector(".linked").innerHTML == " °F") {
      axiosGo(cityName, "imperial");
      document.querySelector(".celcius").classList.add("linked");
      document.querySelector(".celcius").classList.remove("linked");
    } else if (document.querySelector(".linked").innerHTML == "°C |") {
      axiosGo(cityName, "metric");
      document.querySelector(".celcius").classList.remove("linked");
      document.querySelector(".foreign").classList.add("linked");
    }
  });*/
}

main();
