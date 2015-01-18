var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
  exampleAction: function(text){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.EXAMPLE_CONSTANT,
      data: text + ' to Actions'
    });
  },

  getLocation: function(){
    navigator.geolocation.getCurrentPosition(function (position){
      AppDispatcher.handleLocalAction({
        actionType: AppConstants.RECIEVE_LOCATION,
        data: {
          lat: position.coords.latitude,
          long: position.coords.longitude
        }
      });
    });
  },

  fetchWeather: function(){
    $.ajax({
      url: "https://api.forecast.io/forecast/2f8efe741324bd670c91c4cd593a4062/"+lat+","+long+"?units=si",
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

module.exports = AppActions;
