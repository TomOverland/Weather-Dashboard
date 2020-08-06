$(document).ready(function() {
    moment().format('L');

    var APIKey = "b5f00a2e7bd30a0e5a6b6aaacce4599a";

 //Search for Weather by City
function searchCity(cityName) {
    // Building the URL needed to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName + "&appid=" + APIKey;
    // I'm using the query by city name API from openweathermap.org
    var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

        console.log(response);
        console.log(queryURL);
        //clear out the divs and ids that the forecast will go into
        $('#current').empty()
        var date = moment().format('L');
       

        // Transfer content to HTML
        let cityNameEl = $('<h2>').text(response.name);
        let displayDate = cityNameEl.append(' ' + date);
        let tempEl = $('<p>').text('Temperature: ' + response.main.temp);
        let humidityEl = $('<p>').text('Humidity: ' + response.main.humidity);
        let windEl = $('<p>').text('Humidity: ' + response.wind.speed);
        let currentWeather = response.weather[0].main;

        // change the icon based on currentWeather variable
        if (currentWeather === "Rain") {
            let currentIcon = $('<img>').attr('src', 'http://openweathermap.org/img/wn/10d@2x.png');
            currentIcon.attr('style', 'height: 60px; width: 60px;')
        } else if (currentWeather === "Snow") {
            let currentIcon = $("<img>").attr('src', 'http://openweathermap.org/img/wn/13d@2x.png');
            currentIcon.attr('style', 'height: 60px; width: 60px;');
        } else if (currentWeather === "Clouds") {
            let currentIcon = $('<img>').attr('src', 'http://openweathermap.org/img/wn/02d@2x.png');
            currentIcon.attr('style', 'height: 60px; width: 60px;');
        } else if (currentWeather === "Drizzle") {
            let currentIcon = $('<img>').attr('src', 'http://openweathermap.org/img/wn/10d@2x.png');
            currentIcon.attr('style', 'height: 60px; width: 60px;');
        } else if (currentWeather === "Clear") {
            let currentIcon = $('<img>').attr('src', 'http://openweathermap.org/img/wn/01d@2x.png');
            currentIcon.attr('style', 'height: 60px; width: 60px;');
        }

        let newDiv = $('<div>');
        newDiv.append(displayDate, currentIcon, tempEl, humidityEl, windEl);
        $('#current').html(newDiv);


        // Convert the temp to fahrenheit
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;

        // add temp content to html
        $(".temp").text("Temperature (K) " + response.main.temp);
        $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + tempF);
      });
    };

    // UV Index
    let lat = response.coord.lat;
    let lon = response.coord.lon;
    let uvQueryURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;

    $.ajax({
        url: uvQueryURL,
        method: "GET"
    }).then(function (response) {
        $('#uv').empty();
        let uvResults = response.value;
        let uvEl = $("<button class='btn bg-success'>").text("UV Index: " + response.value);
        $('#uv').html(uvEl);
    })

});