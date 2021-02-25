// variables for search for content, history
var searchFormEl = document.querySelector('#search-input');

    function handleSearchFormSubmit(event) {
  event.preventDefault();

searchFormEl.addEventListener('submit', handleSearchFormSubmit);


// Weather API 
// add local storage to save previous search 
// Weather need to include full UV index 
// depending on the weather UV index color will need to change > use css, three different colors
// Weather must include 5 day forcast 