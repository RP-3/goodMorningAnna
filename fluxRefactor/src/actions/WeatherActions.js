var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var $ = require('jquery');

var WeatherActions = {

  fetchWeather: function(location){
    $.ajax({
      url: "https://api.forecast.io/forecast/2f8efe741324bd670c91c4cd593a4062/"+location.lat+","+location.long+"?units=si",
      jsonp: "callback",
      dataType: "jsonp",
      success: function( response ) {
        AppDispatcher.handleExternalAction({
          actionType: AppConstants.RECIEVE_WEATHER,
          data: response
        });
      }
    });
  }

};

module.exports = WeatherActions;
