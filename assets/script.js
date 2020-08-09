$(document).ready(function () {
  const APIKey = "b5f00a2e7bd30a0e5a6b6aaacce4599a";

  //Search for Weather by City
  function searchCity(cityName) {
    // Building the URL needed to query the database
    function searchCity(cityName) {
      var queryURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityName +
        "&units=imperial&appid=b5f00a2e7bd30a0e5a6b6aaacce4599a";
      var forecastQueryURL =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        cityName +
        "&units=imperial&appid=b5f00a2e7bd30a0e5a6b6aaacce4599a";

    // I run an AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      console.log(queryURL);
      //clear out the divs and ids that the forecast will go into
      $("#current").empty();
      let date = moment().format("LL");

      // Transfer content to HTML
      let cityNameEl = $("<h2>").text(response.name);
      let displayDate = cityNameEl.append(" " + date);
      let tempEl = $("<p>").text("Temperature: " + response.main.temp);
      let humidityEl = $("<p>").text("Humidity: " + response.main.humidity);
      let windEl = $("<p>").text("Humidity: " + response.wind.speed);
      let currentWeather = response.weather[0].main;

      // change the weather icon based on currentWeather variable
      if (currentWeather === "Rain") {
        let currentIcon = $("<img>").attr(
          "src",
          "http://openweathermap.org/img/wn/10d@2x.png"
        );
        currentIcon.attr("style", "height: 60px; width: 60px;");
      } else if (currentWeather === "Snow") {
        let currentIcon = $("<img>").attr(
          "src",
          "http://openweathermap.org/img/wn/13d@2x.png"
        );
        currentIcon.attr("style", "height: 60px; width: 60px;");
      } else if (currentWeather === "Clouds") {
        let currentIcon = $("<img>").attr(
          "src",
          "http://openweathermap.org/img/wn/02d@2x.png"
        );
        currentIcon.attr("style", "height: 60px; width: 60px;");
      } else if (currentWeather === "Drizzle") {
        let currentIcon = $("<img>").attr(
          "src",
          "http://openweathermap.org/img/wn/10d@2x.png"
        );
        currentIcon.attr("style", "height: 60px; width: 60px;");
      } else if (currentWeather === "Clear") {
        let currentIcon = $("<img>").attr(
          "src",
          "http://openweathermap.org/img/wn/01d@2x.png"
        );
        currentIcon.attr("style", "height: 60px; width: 60px;");
      }
      //Create a div for elements to appear on page
      var newDiv = $("<div>");

      newDiv.append(displayDate, currentIcon, tempEL, humidityEl, windEl);

      $("#current").html(newDiv);

      //UV Index
      let lat = response.coord.lat;
      let lon = response.coord.lon;
      let uvQueryURL =
        "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=" +
        APIKey +
        "&lat=" +
        lat +
        "&lon=" +
        lon;

      $.ajax({
        url: uvQueryURL,
        method: "GET",
      }).then(function (response) {
        $("#uv").empty();
        let uvResults = response.value;
        let uvEl = $("<button class='btn bg-success'>").text(
          "UV Index: " + response.value
        );
        $("#uv").html(uvEl);
      });
    });
    
    //5 Day Forecast
    $.ajax({
      url: forecastQueryURL,
      method: "GET",
    }).then(function (response) {
      // Storing an array of results in the results variable
      var results = response.list;
      //empty 5day div--------
      $("#5day").empty();
      //create HTML for 5day forcast................
      for (var i = 0; i < results.length; i += 8) {
        // Creating a div
        var fiveDayDiv = $("<div>");

        //Storing the responses date temp and humidity.......
        var date = results[i].dt_txt;
        var setD = date.substr(0, 10);
        var temp = results[i].main.temp;
        var hum = results[i].main.humidity;

        //creating tags with the result items information.....
        var h5date = $("<h5 class='card-title'>").text(setD);
        var pTemp = $("<p class='card-text'>").text("Temp: " + temp);
        var pHum = $("<p class='card-text'>").text("Humidity " + hum);

        var weather = results[i].weather[0].main;

        if (weather === "Rain") {
          var icon = $("<img>").attr(
            "src",
            "http://openweathermap.org/img/wn/09d.png"
          );
          icon.attr("style", "height: 40px; width: 40px");
        } else if (weather === "Clouds") {
          var icon = $("<img>").attr(
            "src",
            "http://openweathermap.org/img/wn/03d.png"
          );
          icon.attr("style", "height: 40px; width: 40px");
        } else if (weather === "Clear") {
          var icon = $("<img>").attr(
            "src",
            "http://openweathermap.org/img/wn/01d.png"
          );
          icon.attr("style", "height: 40px; width: 40px");
        } else if (weather === "Drizzle") {
          var icon = $("<img>").attr(
            "src",
            "http://openweathermap.org/img/wn/10d.png"
          );
          icon.attr("style", "height: 40px; width: 40px");
        } else if (weather === "Snow") {
          var icon = $("<img>").attr(
            "src",
            "http://openweathermap.org/img/wn/13d.png"
          );
          icon.attr("style", "height: 40px; width: 40px");
        }

        //append items to.......
        fiveDayDiv.append(h5date);
        fiveDayDiv.append(icon);
        fiveDayDiv.append(pTemp);
        fiveDayDiv.append(pHum);
        $("#5day").append(fiveDayDiv);
      }
    });
  }

  //Search function
  $("#select-city").on("click", function (event) {
    event.preventDefault();
    // Storing the city name
    var cityInput = $("#city-input").val().trim();
    //save search term to local storage
    var textContent = $(this).siblings("input").val();
    var storearr = [];
    storearr.push(textContent);
    localStorage.setItem("cityName", JSON.stringify(storearr));

    searchCity(cityInput);
    pageLoad();
  });

  //Load stored items
  function pageLoad() {
    var lastSearch = JSON.parse(localStorage.getItem("cityName"));
    var searchDiv = $(
      "<button class='btn border text-muted mt-1 shadow-sm bg-white rounded' style='width: 12rem;'>"
    ).text(lastSearch);
    var psearch = $("<div>");
    psearch.append(searchDiv);
    $("#searchhistory").prepend(psearch);
  }

  //Event deligation...
  $("#searchhistory").on("click", ".btn", function (event) {
    event.preventDefault();
    console.log($(this).text());
    searchCity($(this).text());
  });

  pageLoad();
});
