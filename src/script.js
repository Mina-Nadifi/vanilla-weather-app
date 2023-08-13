function searchWeather() {
  var locationInput = document.getElementById("locationInput");
  var location = locationInput.value;

  // You can use a weather API here to fetch weather data based on the location

  // Display the weather information
  var weatherInfo = document.getElementById("weatherInfo");
  weatherInfo.textContent = "Weather for " + location + ": [Weather Data]";
}
