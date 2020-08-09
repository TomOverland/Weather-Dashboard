$(document).ready(function () {
  const APIKey = "b5f00a2e7bd30a0e5a6b6aaacce4599a";

  //Search for weather by city name
  function searchCity(cityName) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&units=imperial&appid=" +
      APIKey;
    var forecastQueryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityName +
      "&units=imperial&appid=" +
      APIKey;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      console.log(queryURL);
      //each new search will clear the previous
      $("#current").empty();
      let mainDate = moment().format("L");

      //save responses to variables that create html elements
      var cityNameEl = $("<h2>").text(response.name);
      var displayDate = cityNameEl.append(" " + mainDate);
      var temperatureEl = $("<p>").text("Temperature: " + response.main.temp);
      var humidityEl = $("<p>").text("Humidity: " + response.main.humidity);
      var windEl = $("<p>").text("Wind Speed: " + response.wind.speed);
      var weatherCurrent = response.weather[0].main;

      //weather icon changes based on the response of weather
      if (weatherCurrent === "Rain") {
        var currentIcon = $("<img>").attr(
          "src",
          "http://openweathermap.org/img/wn/09d.png"
        );
        currentIcon.attr("style", "height: 60px; width: 60px");
      } else if (weatherCurrent === "Clouds") {
        var currentIcon = $("<img>").attr(
          "src",
          "http://openweathermap.org/img/wn/03d.png"
        );
        currentIcon.attr("style", "height: 60px; width: 60px");
      } else if (weatherCurrent === "Clear") {
        var currentIcon = $("<img>").attr(
          "src",
          "http://openweathermap.org/img/wn/01d.png"
        );
        currentIcon.attr("style", "height: 60px; width: 60px");
      } else if (weatherCurrent === "Drizzle") {
        var currentIcon = $("<img>").attr(
          "src",
          "http://openweathermap.org/img/wn/10d.png"
        );
        currentIcon.attr("style", "height: 60px; width: 60px");
      } else if (weatherCurrent === "Snow") {
        var currentIcon = $("<img>").attr(
          "src",
          "http://openweathermap.org/img/wn/13d.png"
        );
        currentIcon.attr("style", "height: 60px; width: 60px");
      }
      //adding a new div to display responses on index.html
      var newDiv = $("<div>");

      newDiv.append(
        displayDate,
        currentIcon,
        temperatureEl,
        humidityEl,
        windEl
      );

      $("#current").html(newDiv);

      //UV Index

      var lat = response.coord.lat;
      var lon = response.coord.lon;
      var queryURLUV =
        "https://api.openweathermap.org/data/2.5/uvi?&appid=" +
        APIKey +
        "&lat=" +
        lat +
        "&lon=" +
        lon;

      $.ajax({
        url: queryURLUV,
        method: "GET",
      }).then(function (response) {
        $("#uv-display").empty();
        var uvlresults = response.value;
        //create HTML for new div
        var uvEl = $("<button class='btn bg-success'>").text(
          "UV Index: " + response.value
        );

        $("#uvl-display").html(uvEl);
      });
    });

    //five day forecast
    $.ajax({
      url: forecastQueryURL,
      method: "GET",
    }).then(function (response) {
      var results = response.list;
      $("#five-day").empty();
      for (var i = 0; i < results.length; i += 8) {
        var fiveDayDiv = $(
          "<div class='card text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>"
        );

        //saving responses to variables
        var fiveDayDate = results[i].dt_txt;
        var dateText = fiveDayDate.substr(0, 10);
        var fiveDayTemp = results[i].main.temp;
        var hum = results[i].main.humidity;

        //adding the response variables to html elements
        var h5date = $("<h5 class='card-title'>").text(dateText);
        var pTemp = $("<p class='card-text'>").text("Temp: " + fiveDayTemp);
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

        //appending items to the five day forecast
        fiveDayDiv.append(h5date);
        fiveDayDiv.append(icon);
        fiveDayDiv.append(pTemp);
        fiveDayDiv.append(pHum);
        $("#five-day").append(fiveDayDiv);
      }
    });
  }
  pageLoad();
  //----------------------------------------Event handler for user city search-----------------------//

  $("#select-city").on("click", function (event) {
    event.preventDefault();
    //store the searched city name
    var cityInput = $("#city-input").val().trim();

    //save search to local storage
    var textContent = $(this).siblings("input").val();
    var storearr = [];
    storearr.push(textContent);
    localStorage.setItem("cityName", JSON.stringify(storearr));

    searchCity(cityInput);
    pageLoad();
  });

  //load stored items
  function pageLoad() {
    var lastSearch = JSON.parse(localStorage.getItem("cityName"));
    var searchDiv = $(
      "<button class='btn border mt-1 text-dark bg-white rounded' style='width: 12rem;'>"
    ).text(lastSearch);
    var psearch = $("<div>");
    psearch.append(searchDiv);
    $("#search-history").prepend(psearch);
  }

  //searches previous cities when user clicks the search history button associated with the city
  $("#search-history").on("click", ".btn", function (event) {
    event.preventDefault();
    console.log($(this).text());
    searchCity($(this).text());
  });
});
