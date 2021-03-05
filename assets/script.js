// variables for search for content, history
var searchFormEl = $('#search-input');
var searchButton = $("#search-button");
var currentCity = $("#current-city");
var currentHumidity = $("#humidity");
var currentWindSpeed = $("#wind-speed");
var uvIndexBox = $("#uv-index");
var currentDate = $("#today");
var currentTemp = $("#weather");
var searchCity = [];
var city = "";
var lat;
var lon;


function find(c) {
  for (var i = 0; i < searchCity.length; i++) {
    if (c.toUpperCase() === searchCity[i]) {
      return -1;
    }
  }
  return 1;
}

var apiKey = "9c6df7d93197a62075c56f857ce0bf62";

function displayWeather(event) {
  event.preventDefault();
  if (searchFormEl.val().trim() !== "") {
    city = searchFormEl.val().trim();
    //currentWeather(city);
    currentWeather(city)

  }
}

function currentWeather(city) {
  var urlReq = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + "&appid=" + apiKey;

  $.ajax({
    url: urlReq,
    method: "GET",
  }).then(function (response) {


    console.log(response);

    currentTemp
      .text(response.list[0].main.temp_max + " F")

    var weatherIcon = response.list[0].weather[0].icon;
    var iconURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

    // var date = currentDate.text(new Date().getDate())
    var date = new Date((response.list[0].dt_txt))
    $(currentCity).html(response.city.name + "(" + date + ")" + "<img src=" + iconURL + ">");

    $(currentHumidity).html(response.list[0].main.humidity + "%");

    var windSpeed = response.list[0].wind.speed;
    var windMph = (windSpeed * 2.237).toFixed(1);
    currentWindSpeed.html(windMph + "MPH")

    for (let i = 0; i < 20; i += 4) {
      $(`#future-date${i}`).html(response.list[i].dt_txt)
      $(`#future-image${i}`).html(`<img src=${iconURL}>`)
      $(`#future-temp${i}`).html(response.list[i].main.temp_max + "F");
      $(`#future-humidity${i}`).html(response.list[i].main.humidity + "%");
    }


    // uv index
    lat = response.city.coord.lat;
    lon = response.city.coord.lon;
    //$(uvIndex).html(lat, lon);
    uvIndex()
  });
}

// uvIndex not responding
function uvIndex() {
  var uviUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

  $.ajax({
    url: uviUrl,
    method: 'GET',
  }).then(function (response) {

    console.log(response);

    uvIndexBox.html(response.value);


  });

}




$("#search-button").on("click", displayWeather);

