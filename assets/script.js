// variables for search for content, history
var searchFormEl = $('#search-input');
var searchButton = $("#search-button");
var currentCity = $("#current-city");
var currentHumidity = $("#humidity");
var currentWindSpeed = $("#wind-speed");
var uvIndex = $("#uv-index");
var currentDate = $("#today");
var currentTemp = $("#weather");
var searchCity = [];
var city = "";

function find(c){
  for (var i=0; i<searchCity.length; i++){
    if(c.toUpperCase()===searchCity[i]){
      return -1;
    }
  }
  return 1;
}

var apiKey = "9c6df7d93197a62075c56f857ce0bf62";

function displayWeather(event) {
  event.preventDefault();
 if(searchFormEl.val().trim()!==""){
   city=searchFormEl.val().trim();
   currentWeather(city);
 }
}

function currentWeather (city){
  var urlReq = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + apiKey;

  $.ajax ({
    url:urlReq,
    method: "GET",
  }).then(function(response){


    console.log(response);

    currentTemp
    .text(response.main.temp_max + " F")

    var weatherIcon= response.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

    var date = currentDate.text(new Date().getDate())
    $(currentCity).html(response.name + "("+date+")" + "<img src=" + iconURL + ">");

    $(currentHumidity).html(response.main.humidity+"%");
    
    var windSpeed = response.wind.speed;
    var windMph = (windSpeed*2.237).toFixed(1);
    $(currentWindSpeed).html(windMph + "MPH")
     
    // uvIndex (response.coord.lon, response.coord.lat);
    // forcast(response.id);
    // if else statement goes below


  });
}

// uvIndex not responding
function UVIndex (ln,lt) {
  var uniUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lon=" + ln + "&lat=" + lt;
  $.ajax({
    url: uniUrl,
    method: 'GET',
  }).then(function (response) {
    console.log(response);
    $(uvIndex).html(response.value);

    uvIndex
    text(response.city.coord.lat, response.city.coord.lat)
  });
}

// 5 day forcast
function forcast (cityid){
  var urlReq2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityid + "&units=imperial" + "&appid=" + apiKey;
  $.ajax({
    url: urlReq2,
    method: 'GET',
  }).then(function (response) {
    console.log(response);


  });
}


$("#search-button").on("click",displayWeather);

