function main() {
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
}
main();
