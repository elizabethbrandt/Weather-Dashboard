renderStorage();

var citySearchHistory = [];

// Display current date
var today = moment().format('(MM/DD/YYYY)');

// Pull in current weather info to the main card
function currentConditions(cityInput) {

    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&appid=35f5097b02a181982a5bb6c4eee0ce65&units=imperial';

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            $('#city-name').text(response.name + ' ' + today);
            var icon = response.weather[0].icon
            $('#icon').attr('src', 'http://openweathermap.org/img/wn/' + icon + '.png');
            $('#temperature').text('Temperature: ' + response.main.temp + ' °F');
            $('#humidity').text('Humidity: ' + response.main.humidity + '%');
            $('#wind-speed').text('Wind Speed: ' + response.wind.speed + ' MPH');

            var cityLongitude = response.coord.lon;
            var cityLatitude = response.coord.lat;

            var queryUVI = "http://api.openweathermap.org/data/2.5/uvi?lat=" + cityLatitude + "&lon=" + cityLongitude + "&appid=35f5097b02a181982a5bb6c4eee0ce65&units=imperial"

            $.ajax({
                url: queryUVI,
                method: "GET"
            })
                .then(function (response) {
                    var uviResponse = response.value
                    $('#uv-index').text('UV Index: ' + uviResponse);

                    if (uviResponse < 3) {
                        $('#uv-index').addClass('bg-success');
                        $('#uv-index').removeClass('bg-danger bg-warning');

                    } else if (uviResponse >= 3 && uviResponse < 6) {
                        $('#uv-index').addClass('bg-warning');
                        $('#uv-index').removeClass('bg-success bg-danger');

                    } else if (uviResponse > 6) {
                        $('#uv-index').addClass('bg-danger');
                        $('#uv-index').removeClass('bg-success bg-warning');

                    }

                });

        });

};

// Pull in 5-day forecast to the weather cards below
function forecast(cityInput) {

    var forecastQueryURL = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + cityInput + '&cnt=5&appid=166a433c57516f51dfab1f7edaed8413&units=imperial';

    $.ajax({
        url: forecastQueryURL,
        method: "GET"
    })
        .then(function (response) {

            console.log(response);

            for (var i = 0; i < 5; i++) {

                $('#date' + i).text(response.list[i].dt_txt);
                // console.log(response.list[i + 8].dt_txt);

                var smallIcon = response.list[i].weather[0].icon
                $('#icon' + i).attr('src', 'http://openweathermap.org/img/wn/' + smallIcon + '.png');
                $('#temp' + i).text('Temperature: ' + response.list[i].main.temp + ' °F');
                $('#humid' + i).text('Humidity: ' + response.list[i].main.humidity + '%');

            }
        });

}

function saveSearchHistory(cityInput) {

    // Pull the cityName into the list item
    var liEl = `<li class="list-group-item">${cityInput}</li>`

    // Append the newly created list item to the unordered list
    $('.list-group').prepend(liEl);

    // Add city to the search history array
    citySearchHistory.push(cityInput);

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
$('.list-group').click(function (event) {

    var clickedCity = event.target.innerHTML;

    currentConditions(clickedCity);
    forecast(clickedCity);

})

// Click event to create search history below the search bar and save to local storage
$('#button-addon2').click(function() {
    
    var cityName = $('#city-input').val().trim();

    saveSearchHistory(cityName);

    currentConditions(cityName);

    forecast(cityName);

});