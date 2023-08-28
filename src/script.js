function main() {
  // Fetch Function called axiosGo
  function axiosGo(city, units) {
    clearList();
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
    let apiKey = "e450bc345a80a08ada69fd5c714d871d";
    let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showWeather);
    axios.get(apiUrl).then(showDate);
    if (units == "metric") {
      axios.get(apiUrl).then((response) => {
        document.querySelector(".windSpeed").innerHTML = `${(
          (response.data.wind.speed * 3600) /
          1000
        ).toFixed(1)}`;
      });
    }
    axios.get(apiUrl).catch(function (error) {
      alert("Please Enter a Valid City name");
      clearList();
      document.querySelector("#locationInput").value = "";
    });
    clearList();

    //New function for fixing the wind speed : the functions gets both imperial and metric , cpmpare the two and puts the big in imperial and the small into metric
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
      .setAttribute("src", `/img/weather/${response.data.weather[0].icon}.png`);
    document.querySelector(".humidity").innerHTML = ` ${Math.round(
      response.data.main.humidity
    )}%`;
    document.querySelector(
      ".windSpeed"
    ).innerHTML = `${response.data.wind.speed.toFixed(1)}`;
    document.querySelector(".minTemp").innerHTML = ` ${Math.round(
      response.data.main.temp_min
    )}`;
    document.querySelector(".maxTemp").innerHTML = `${Math.round(
      response.data.main.temp_max
    )} `;
    //The starting point for forecast deployment:
    let cityLat = response.data.coord.lat.toFixed(2);
    let cityLong = response.data.coord.lon.toFixed(2);
    console.log(`${cityLat},${cityLong}`);
    showForecast(cityLat, cityLong, "metric");
  }
  //defining forecast function
  function showForecast(lat, lon, unit) {
    let apiKey = "89aecfe4bf3bado8c43104d8b6tfa03d";
    let forcastAPI = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=${unit}`;
    axios.get(forcastAPI).then((res) => {
      console.log(res.data.daily[0].time);
    });
    axios.get(forcastAPI).then((cast) => {
      console.log(cast.data.daily);
      let i = 0;
      for (let index = 1; index < cast.data.daily.length; index++) {
        document.querySelectorAll(".forecast-time")[index].innerHTML =
          showFutureDate(cast.data.daily[index]);

        document.querySelectorAll(".forecast-temperature-max")[
          index
        ].innerHTML = `${cast.data.daily[index].temperature.maximum.toFixed(
          0
        )}`;

        document.querySelectorAll(".forecast-temperature-min")[
          index
        ].innerHTML = `${cast.data.daily[index].temperature.minimum.toFixed(
          0
        )}`;

        document
          .querySelectorAll(".future-image")
          [index].setAttribute(
            "src",
            `/img/weather/${cast.data.daily[index].condition.icon}.png`
          );

        document
          .querySelectorAll(".future-image")
          [index].setAttribute("width", "85px;");
      }
    });
  }
  // function showFutureDate
  function showFutureDate(future) {
    let weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let weekday = new Date(future.time * 1000);
    let ret = weekDays[weekday.getDay()];
    return ret.slice(0, 3);
  }
  // Setting Current Day and Time showDate function using ---"Axios Response"---
  function showDate(response) {
    let weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let currentDate = new Date(response.data.dt * 1000);
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
  //function for city names suggestions #############################
  // Function showResult adds the evaluated result  under the search box when user types
  function showResults(suggestions) {
    for (let cname of suggestions) {
      let dataElement = document.createElement("li");
      dataElement.classList.add("suggestion-item");
      dataElement.setAttribute("id", "suggestion-item");
      let content = document.createTextNode(cname.name);
      dataElement.appendChild(content);
      document.getElementById("suggestion-box").classList.add("suggestions");
      document.getElementById("suggestion-box").appendChild(dataElement);
    }
    document.querySelectorAll(".suggestion-item").forEach((ele) => {
      ele.addEventListener("click", () => {
        document.getElementById("locationInput").value = ele.innerHTML;
        clearList();
        cityName = ele.innerHTML;
        axiosGo(cityName, "metric");
      });
    });
  }
  //clear List as it's name clears the list of suggestion in two events. when user types and after user submits the form I removed the condition for 4th letter
  //Cause I made if (queryOfUser.length >= 4) {} to refresh the suggestion Items list in <ul>
  function clearList() {
    let userSuggest = document.querySelector(".searchInput");
    let queryOfUser = userSuggest.value;

    document
      .querySelectorAll(".suggestion-item")
      .forEach((index) => index.remove());
    document.getElementById("suggestion-box").classList.remove("suggestions");
  }
  //Function look up evaluates the result which is to be shown under the serach box
  //This function will be written in rust and will be imported as wasm
  function lookUp(response) {
    clearList();
    let userInputType = document.querySelector(".searchInput").value;
    userInputType = userInputType.trim().toLowerCase();
    userInputType =
      userInputType.charAt(0).toUpperCase() + userInputType.slice(1);
    showResults(
      response.filter((object) => {
        return object.name.startsWith(userInputType);
      })
    );
  }
  function myFunction(event) {
    //new code to fix the "enter key inside form input but not clearing search result error"
    if ((event.which === 13) | (event.code === "Enter")) {
      clearList();
    } else {
      let x = document.querySelector(".searchInput");
      let word = x.value;
      if (word.length >= 3) {
        fetch("/src/city.list.json")
          .then((response) => response.json())
          .then(lookUp);
      }
    }
  }
  document.querySelector(".searchInput").addEventListener("keyup", myFunction);
  //Generated Api Url Using form location Input for city ---  User Action
  document.querySelector(".inputCity").addEventListener("submit", (event) => {
    event.preventDefault();
    clearList();
    document.body.addEventListener("click", clearList);

    if (document.querySelector("#locationInput").value.length === 0) {
      alert("Please type a city name !!");
    } else {
      cityName = document.querySelector("#locationInput").value;
    }
    let unit = "metric";
    axiosGo(cityName, unit);
    classSwitcher(".foreign", ".celcius");
    document.querySelector(".speedUnit").innerHTML = "km/h";
    clearList();
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
  function changeTempToCel() {
    axiosGo(cityName, "metric");
    classSwitcher(".foreign", ".celcius");
    document.querySelector(".speedUnit").innerHTML = "km/h";
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

  document
    .querySelectorAll(".celcius")[0]
    .addEventListener("click", changeTempToCel);
  document
    .querySelectorAll(".celcius")[1]
    .addEventListener("click", changeTempToCel);
  document
    .querySelectorAll(".celcius")[2]
    .addEventListener("click", changeTempToCel);
}
main();
