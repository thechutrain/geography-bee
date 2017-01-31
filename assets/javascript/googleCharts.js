// declaring this global variable early
var foundCountries = [];

function displayCountries(){
  // 1. push all found countries to array
  var countries_arr = [ ["Country", "Color"] ];
  foundCountries.forEach(function(country){
      countries_arr.push([country.Code, 300]);
  });

  // 1.5 make the last country brighter
 if (countries_arr.length >= 2){
    var lastCountry = countries_arr.pop();
  lastCountry[1] = 700;
  countries_arr.push(lastCountry); 
 }

  // 2. GOOGLE script that updates the map
  google.charts.load('upcoming', {'packages':['geochart']});
  google.charts.setOnLoadCallback(drawRegionsMap);

  function drawRegionsMap() {
      var data = google.visualization.arrayToDataTable(countries_arr);
      var options = {
        enableRegionInteractivity: false,
        legend: "none",
        displayMode: "regions"
         // region: "002",
        }; 
    $("#map_target").empty();
    var chart = new google.visualization.GeoChart(document.getElementById('map_target'));
    chart.draw(data, options);
  }; // drawRegionsMap();

} // closes displayCountry()