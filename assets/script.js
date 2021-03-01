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
  var urlReq = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
  $.ajax ({
    url:urlReq,
    method: "GET",
  }).then(function(response){


    console.log(response);

    var weatherIcon= response.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

    var date = newDate (response.dt*1000).toLocaleDateString();
    $(currentCity).html(response.name + "("+date+")" + "<img src=" + iconURL + ">");

    var fahrenheitTemp = (response.main.temp - 273.15) * 1.80 + 32;
    $(currentTemp).html((fahrenheitTemp).toFixed(2)+"&#8457");
    $(currentHumidity).html(response.main.humidity+"%");
    
    var windSpeed = response.wind.speed;
    var windMph = (ws*2.237).toFixed(1);
    $(currentWindSpeed).html(windMph + "MPH")

    UVIndex(response.coord.lon,response.coord.lat);
    forecast(response.id);
    if(response.cod == 200){
      searchCity=JSON.parse(localStorage.getItem("cityname"));
      console.log(searchCity)
      if(searchCity == null){
        searchCity = [];
        searchCity.push(city.toLocaleDateString()
        );
        localStorage.setItem("cityname", JSON.stringify(searchCity));
        addToList(city);
      } else {
        if (find(city)>0){
          searchCity.push(city.toUpperCase());
          localStorage.setItem("cityname", JSON.stringify(searchCity));
          addToList(city);
        }
      }
    }


  });
}

$("#search-button").on("click",displayWeather);

