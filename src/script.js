function main() {
  // Function #1 that uses axios response after the apiUrl is built
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
    )} km/h`;
    document.querySelector(".minTemp").innerHTML = ` ${Math.round(
      response.data.main.temp_min
    )}`;
    document.querySelector(".maxTemp").innerHTML = `${Math.round(
      response.data.main.temp_max
    )} `;
  }

  // Setting Current Day and Time
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
    console.log(currentDate);
    console.log("Hello world");
    document.querySelector(".currentDate").innerHTML = `${
      weekDays[currentDate.getDay()]
    }    ${currentDate.getHours()}:${currentDate.getMinutes()}`;
  }
  //Generated Api Url Using form location Input for city
  document.querySelector(".inputCity").addEventListener("submit", (event) => {
    event.preventDefault();
    if (document.querySelector("#locationInput").value.length === 0) {
      alert("Please type a city name !!");
    } else {
      cityName = document.querySelector("#locationInput").value;
    }
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
    let apiKey = "e450bc345a80a08ada69fd5c714d871d";
    let unit = "metric";

    let apiUrl = `${apiEndpoint}?q=${cityName}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(showWeather);
    axios.get(apiUrl).then(showDate);
    axios.get(apiUrl).catch(function (error) {
      alert("Please Enter a Valid City name");
      document.querySelector("#locationInput").value = "";
    });
  });

  //1 --- Capitalizes First letter of every word
  function capitalizer(name) {
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
    return capitalized;
  }

  //2 ---Default Api Url at page start
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "e450bc345a80a08ada69fd5c714d871d";
  let unit = "metric";
  let cityName = "New York";

  //4 ---Default Page Loading view
  document.querySelector("h1").innerHTML = cityName;
  let apiUrl = `${apiEndpoint}?q=${cityName}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);
  axios.get(apiUrl).then(showDate);

  //Unit change based on User's Request
  document.querySelector(".foreign").addEventListener;
}
main();
