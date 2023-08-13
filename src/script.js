function searchWeather() {
  let locationInput = document.getElementById("locationInput");
  let location = locationInput.value;

  // You can use a weather API here to fetch weather data based on the location

  // Display the weather information
  var weatherInfo = document.getElementById("weatherInfo");
  weatherInfo.textContent = "Weather for " + location + ": [Weather Data]";
}

// Graph 1 (Using Canvas)
var canvas1 = document.getElementById("graphCanvas1");
var ctx1 = canvas1.getContext("2d");
var graphData1 = [10, 20, 30, 40, 50, 40, 30]; // Sample data

ctx1.beginPath();
ctx1.moveTo(0, canvas1.height / 2); // Starting point at the center of the canvas

// Draw zigzag lines aligned with each box in the weather forecast
for (var i = 0; i < graphData1.length; i++) {
  ctx1.lineTo(
    (canvas1.width / (graphData1.length - 1)) * i,
    canvas1.height / 2 - graphData1[i]
  );
}

ctx1.strokeStyle = "blue";
ctx1.stroke();

// Graph 2 (Using SVG)
var svg = document.getElementById("graphSVG");
var graphData2 = [20, 40, 30, 50, 60, 40, 20]; // Sample data

var svgLine = document.createElementNS("http://www.w3.org/2000/svg", "line");

// Set up the starting point and attributes for the line
svgLine.setAttribute("x1", 0);
svgLine.setAttribute("y1", svg.clientHeight / 2);
svgLine.setAttribute("x2", 0);
svgLine.setAttribute("y2", svg.clientHeight / 2 - graphData2[0]);
svgLine.setAttribute("stroke", "red");
svg.appendChild(svgLine);

// Draw the line segments aligned with each box in the weather forecast
for (var j = 1; j < graphData2.length; j++) {
  var newLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
  newLine.setAttribute(
    "x1",
    (svg.clientWidth / (graphData2.length - 1)) * (j - 1)
  );
  newLine.setAttribute("y1", svg.clientHeight / 2 - graphData2[j - 1]);
  newLine.setAttribute("x2", (svg.clientWidth / (graphData2.length - 1)) * j);
  newLine.setAttribute("y2", svg.clientHeight / 2 - graphData2[j]);
  newLine.setAttribute("stroke", "red");
  svg.appendChild(newLine);
}

// Graph 3 (Using Canvas)
var canvas2 = document.getElementById("graphCanvas2");
var ctx2 = canvas2.getContext("2d");
var graphData3 = [50, 30, 20, 40, 60, 30, 10]; // Sample data

ctx2.beginPath();
ctx2.moveTo(canvas2.width / 2, 0); // Starting point at the center of the canvas

// Draw vertical lines aligned with each box in the weather forecast
for (var k = 0; k < graphData3.length; k++) {
  ctx2.lineTo(
    canvas2.width / 2 + graphData3[k],
    (canvas2.height / (graphData3.length - 1)) * k
  );
}

ctx2.strokeStyle = "green";
ctx2.stroke();
