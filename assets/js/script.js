renderStorage();

var citySearchHistory = [];

// Display current date
var today = moment().format('(MM/DD/YYYY)');

// Add event listener to the search button
$('#button-addon2').click(currentConditions);

// Pull in current weather info to the main card
function currentConditions() {

    // event.preventDefault();
    // console.log(event);

    var cityName = $('#city-input').val().trim();
    // console.log(cityName);

    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=35f5097b02a181982a5bb6c4eee0ce65&units=imperial';

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            // console.log(response);
            $('#city-name').text(response.name + ' ' + today);
            var icon = response.weather[0].icon
            $('#icon').attr('src', 'http://openweathermap.org/img/wn/' + icon + '.png');
            $('#temperature').text('Temperature: ' + response.main.temp + ' °F');
            $('#humidity').text('Humidity: ' + response.main.humidity + '%');
            $('#wind-speed').text('Wind Speed: ' + response.wind.speed + ' MPH');
            // $('#uv-index').text(response.);
        });
};

$('#button-addon2').click(forecast);

// Pull in 5-day forecast to the weather cards below
function forecast() {

    var cityName = $('#city-input').val().trim();

    var forecastQueryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=35f5097b02a181982a5bb6c4eee0ce65&units=imperial';

    $.ajax({
        url: forecastQueryURL,
        method: "GET"
    })
        .then(function (response) {

            for (var i = 0; i < 6; i++) {
                $('#date' + i).text(response.list[i].dt_txt);
                // console.log(response.list[i + 8].dt_txt);

                var smallIcon = response.list[i].weather[0].icon
                $('#icon' + i).attr('src', 'http://openweathermap.org/img/wn/' + smallIcon + '.png');
                $('#temp' + i).text('Temperature: ' + response.list[i].main.temp + ' °F');
                $('#humid' + i).text('Humidity: ' + response.list[i].main.humidity + '%');
            }
        });

}
// MIGHT need something like this for the search history??
// $("#buttons-view").empty();

// Click event to create search history below the search bar and save to local storage
$('#button-addon2').click(saveSearchHistory);

function saveSearchHistory() {

    var cityName = $('#city-input').val().trim().toUpperCase();

    // Pull the cityName into the list item
    var liEl = `<li class="list-group-item">${cityName}</li>`

    // Append the newly created list item to the unordered list
    $('.list-group').prepend(liEl);

    // Add city to the search history array
    citySearchHistory.push(cityName);

    // save cities to local storage
    localStorage.setItem('Cities', JSON.stringify(citySearchHistory));
};

// Get localstorage to render to page
function renderStorage() {

    var savedCity = JSON.parse(localStorage.getItem('Cities'));

    // if the local storage HAS a value 
    if (savedCity !== null) {

        // then set whatever values are in there, to the global search history array
        citySearchHistory = savedCity;

        for (var i = 0; i < citySearchHistory.length; i++) {

            var savedCityName = citySearchHistory[i];

            var searchedCityName = `<li class="list-group-item">${savedCityName}</li>`

            $('.list-group').prepend(searchedCityName);
        }
    }
}

// Click event for search history
$('.list-group-item').click(function (event) {

    var clickedCity = event.target.innerHTML;

    // Could I also do "citySearchHistory[i]"?
    console.log(clickedCity);

    // Need to link "clickedCity" to "cityName" tied to the query

    currentConditions(clickedCity);
    forecast(clickedCity);
})
