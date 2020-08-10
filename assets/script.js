$(document).ready(function () {
  const APIKey = "b5f00a2e7bd30a0e5a6b6aaacce4599a";

  //Search for weather by city name
  function searchCity(cityName) {
    const queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&units=imperial&appid=" +
      APIKey;
    const forecastQueryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityName +
      "&units=imperial&appid=" +
      APIKey;

    //ajax call for current weather stats for a city
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
      let cityNameEl = $("<h2>").text(response.name);
      let displayDate = cityNameEl.append(" " + mainDate);
      let temperatureEl = $("<p>").text("Temperature: " + response.main.temp);
      let humidityEl = $("<p>").text("Humidity: " + response.main.humidity);
      let windEl = $("<p>").text("Wind Speed: " + response.wind.speed);
      let weatherCurrent = response.weather[0].main;

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
      let newDiv = $("<div>");

      newDiv.append(
        displayDate,
        currentIcon,
        temperatureEl,
        humidityEl,
        windEl
      );

      $("#current").html(newDiv);

      //UV Index

      const lat = response.coord.lat;
      const lon = response.coord.lon;
      const queryURLUV =
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
        let uvResults = response.value;
        //Create the colored reponses for UV Indexes, 1-2 low (green), 3-6 moderate (yellow), 7+ severe (red)
        if (Math.floor(uvResults) < 3) {
          var uvEl = $("<button class='btn btn-success'>").text(
            "UV Index: " + response.value
          );
        } else if (Math.floor(uvResults) >= 3 && Math.floor(uvResults) < 7) {
          var uvEl = $("<button class='btn btn-warning'>").text(
            "UV Index: " + response.value
          );
        } else if (Math.floor(uvResults) >= 7) {
          var uvEl = $("<button class='btn btn-danger'>").text(
            "UV Index: " + response.value
          );
        }
        $("#uv-display").html(uvEl);
      });
    });

    //five day forecast

    $.ajax({
      url: forecastQueryURL,
      method: "GET",
    }).then(function (response) {
      var results = response.list;
      $("#five-day").empty();
      //loop through the forecast list array and display a single forecast entry, using the highest temp, from each of the five days
      for (var i = 6; i < results.length; i += 8) {
        //array index #s - 6, 14, 22, 30, 38
        let fiveDayDiv = $(
          "<div class='card text-white bg-primary mx-auto mb-10 p-2' style='width: 9rem; height: 11rem;'>"
        );

        //saving responses to variables
        let fiveDayDate = results[i].dt_txt;
        let dateText = fiveDayDate.substr(0, 10);
        let fiveDayTempResults = results[i].main.temp;
        let fiveDayHumResults = results[i].main.humidity;

        //adding the response variables to html elements
        let dateFiveDayEl = $("<h5 class='card-title'>").text(dateText);
        let tempFiveDayEl = $("<p class='card-text'>").text("Temp: " + fiveDayTempResults);
        let humFiveDayEl = $("<p class='card-text'>").text("Humidity " + fiveDayHumResults);

        let weather = results[i].weather[0].main;

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
        fiveDayDiv.append(dateFiveDayEl);
        fiveDayDiv.append(icon);
        fiveDayDiv.append(tempFiveDayEl);
        fiveDayDiv.append(humFiveDayEl);
        $("#five-day").append(fiveDayDiv);
      }
    });
  }
  
  //runs the searched city input
  pageLoad();

  //click the "search" button to search for the city that the user entered into the input field
  $("#select-city").on("click", function (event) {
    event.preventDefault();
    //store the searched city name
    let cityInput = $("#city-input").val().trim();

    //save search to local storage
    let textContent = $(this).siblings("input").val();
    let savedArray = [];
    savedArray.push(textContent);
    localStorage.setItem("cityName", JSON.stringify(savedArray));

    searchCity(cityInput);
    pageLoad();
  });

  //load stored items
  function pageLoad() {
    let lastSearch = JSON.parse(localStorage.getItem("cityName"));
    let searchDiv = $(
      "<button class='btn border mt-1 text-dark bg-white rounded' style='width: 12rem;'>"
    ).text(lastSearch);
    let previousSearchEl = $("<div>");
    previousSearchEl.append(searchDiv);
    $("#search-history").prepend(previousSearchEl);
  }

  //searches previous cities when user clicks the search history button associated with the city
  $("#search-history").on("click", ".btn", function (event) {
    event.preventDefault();
    console.log($(this).text());
    searchCity($(this).text());
  });
});
