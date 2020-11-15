// The createRow function takes data returned by OMDB and appends the table data to the tbody
// var addSearchHistory = function (data) {
//     // Creates a variable for the `ul` 
//     var ulEl = $("ul");

//     // Pull the cityName into the list item
//     var liEl = $("<li>").text(data.cityName);

//     // Append the newly created list item to the unordered list
//     liEl.prepend(ulEl);
// };

// Display current date
var today = moment().format('(MM/DD/YYYY)');

// Add event listener to the search button
// $('#button-addon2').on("click", "button", searchOWM);

// The search OWM function takes a cityName, searches the OWM api for it, and then passes the data to
var searchOWM = function (event) {

    // event.preventDefault();

    var cityName = $('#city-input').val().trim();

    // var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appikey=35f5097b02a181982a5bb6c4eee0ce65";

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&appid=166a433c57516f51dfab1f7edaed8413"

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            $('#city-name').text(JSON.stringify(response.name + ' ' + today));
            $('#temperature').text(JSON.stringify('Temperature: ' + response.main.temp));
            $('#humidity').text(JSON.stringify('Humidity: ' + response.main.humidity + '%'));
            $('#wind-speed').text(JSON.stringify('Wind Speed: ' + response.wind.speed + ' MPH'));
            // $('#uv-index').text(JSON.stringify(response.));
            // console.log(JSON.parse(response.name));
        });
};
searchOWM();
// searchOWM("userInput")

// Pull in current weather info to the main card

// Pull in 5-day forecast to the weather cards below

// MIGHT need something like this for the search history??
// $("#buttons-view").empty();
