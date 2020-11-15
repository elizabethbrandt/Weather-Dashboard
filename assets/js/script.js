// Add event listener to the search button
// $('button-addon2').on("click", "button", searchOWM);

// The createRow function takes data returned by OMDB and appends the table data to the tbody
var addSearchHistory = function (data) {
    // Creates a variable for the `ul` 
    var ulEl = $("ul");

    // Pull the cityName into the list item
    var liEl = $("<li>").text(data.cityName);

    // Append the newly created list item to the unordered list
    liEl.prepend(ulEl);
};

// The search OWM function takes a cityName, searches the OWM api for it, and then passes the data to
var searchOWM = function (cityName) {

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appikey=35f5097b02a181982a5bb6c4eee0ce65";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
        });
};
searchOWM();
// searchOWM("userInput")

// Pull in current weather info to the main card

// Pull in 5-day forecast to the weather cards below
