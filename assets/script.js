// variables for search for content, history
var searchFormEl = $('#search-input');
var button = $("#search-button");
var current = $("#today");
var temperature = $("#weather");

function handleSearchFormSubmit() {

  // Weather API 
  var city = searchFormEl.val()
  var urlRequest = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=9c6df7d93197a62075c56f857ce0bf62`                   

  $.ajax({
    url: urlRequest,
    method: 'GET',
  }).then(function (response) {
    console.log('Ajax Reponse \n-------------');
    console.log(response);
    current.text(new Date().getDate())
    temperature.text(response.list[0].main.temp + " F")

    for(const data of response.list) {
      console.log(data);
      if(data.dt_txt.indexOf("12:00:00")!== -1) {
        console.log(data.dt_txt);
         current.text(new Date().getDate())
         temperature.text(data.main.temp + " F")
      }
       

    }


  });
}
button.on('click', () => {
  handleSearchFormSubmit()
});

// add local storage to save previous search 
// Weather need to include full UV index 
// depending on the weather UV index color will need to change > use css, three different colors
// Weather must include 5 day forcast 
// 
