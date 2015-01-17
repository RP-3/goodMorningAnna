var forecastOptions = {
  clear_day: "wi-day-sunny",
  clear_night: "wi-night-clear",
  rain: "wi-rain",
  snow: "wi-snow",
  sleet: "wi-sleet",
  wind: "wi-strong-wind",
  fog: "wi-fog",
  cloudy: "wi-cloudy",
  partly_cloudy_day: "wi-day-cloudy",
  partly_cloudy_night: "wi-night-cloudy",
};

module.exports = function(){
  navigator.geolocation.getCurrentPosition(function(position){
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    //cb function to display weather when we know it

    $.ajax({
      url: "https://api.forecast.io/forecast/2f8efe741324bd670c91c4cd593a4062/"+lat+","+long+"?units=si",
      jsonp: "callback",
      dataType: "jsonp",
      success: function( response ) {
          console.log( response ); // server response
          
          //fetch the icon classname for display
          var icon = response.currently.icon;
          if(icon && typeof icon === 'string'){
            icon = icon.replace(/\-/g, '_');
            icon = forecastOptions[icon];
          }else{
            icon = "wi-thermometer-exterior";
          }

          var temperature = Math.round(response.currently.temperature);
          var max = Math.round(response.daily.data[0].temperatureMax);
          var tempString = temperature + '/' + max;

          $('#temperature').text(tempString);

          //response.currently.aparentTemperature
      }
    });

  });
};
