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
  var urlReq = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + "&appid=" + apiKey;

  var urlReq2 = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + apiKey;
  console.log(urlReq2);

  $.ajax ({
    url:urlReq,
    method: "GET",
  }).then(function(response){


    console.log(response);

    currentTemp
    .text(response.list[0].main.temp + " F")

    var weatherIcon= response.list[0].weather[0].icon;
    var iconURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

    var date = currentDate.text(new Date().getDate())
    $(currentCity).html(response.name + "("+date+")" + "<img src=" + iconURL + ">");

    $(currentHumidity).html(response.list[0].main.humidity+"%");
    
    var windSpeed = response.list[0].wind.speed;
    var windMph = (windSpeed*2.237).toFixed(1);
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

