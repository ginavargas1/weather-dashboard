// variables for search for content, history
var searchFormEl = $('#search-input');
var searchButton = $("#search-button");
var currentCity = $("#current-city");
var currentHumidity = $("#humidity");
var currentWindSpeed = $("#wind-speed");
var uvIndex = $("#uv-index");
var currentDate = $("#today");
var currentTemp = $("#weather");

function handleSearchFormSubmit() {

  // Weather API 
  var apiKey = "9c6df7d93197a62075c56f857ce0bf62";

  function displayWeather(event){
    event.preventDefault();
    if(searchFormEl.val().trim()!=="") {
      city=searchCiy.val().trim();
    }
  }

  var city = searchFormEl.val()
  var urlRequest = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=9c6df7d93197a62075c56f857ce0bf62`                   

  var urlRequest2 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=9c6df7d93197a62075c56f857ce0bf62`                   
  console.log(urlRequest2)



  $.ajax({
    url: urlRequest,
    method: 'GET',
  }).then(function (response) {
    console.log('Ajax Reponse \n-------------');
    console.log(response);
    currentDate.text(new Date().getDate("M/D/YYYY"))
    currentTemp
  .text(response.list[0].main.temp + " F")

    for(const data of response.list) {
      console.log(data);
      if(data.dt_txt.indexOf("12:00:00")!== -1) {
        console.log(data.dt_txt);
         currentDate.text(new Date().getDate())
         currentTemp
        .text(data.main.temp + " F")
      }
       
      var weatherIcon = $("<img>");
        weatherIcon.attr(
          "src",
          
          "http://openweathermap.org/img/wn/" + weather[0].ui-icon + ".png", 
            
          console.log(icon),
        console.log(weatherIcon)
        )
          // + weather.weather[0].icon + ".png"
        $("#currentDate-icon").empty();
        $("#currentDate-icon").append(weatherIcon);

    }

s
  });
}
searchButton.on('click', () => {
  handleSearchFormSubmit()
});

// add local storage to save previous search 
// Weather need to include full UV index 
// depending on the weather UV index color will need to change > use css, three different colors
// Weather must include 5 day forcast 
// 

