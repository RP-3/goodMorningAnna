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

  toggleDataPanel: function(){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.TOGGLE_DATA_PANEL,
      data: null
    });
  },

  toggleSettingsPanel: function(){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.TOGGLE_SETTINGS_PANEL,
      data: null
    });
  },

  setDisplayName: function(name){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SET_DISPLAY_NAME,
      data: name
    });
  },

};

module.exports = AppActions;
