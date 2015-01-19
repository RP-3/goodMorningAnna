var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';

var _data = {
  message: 'Data from Store',
  displayName: null,
  imageSource: null,
  location: null,
  dataPanelOpen: false,
  settingsPanelOpen: false,
};

var calcTodaysImage = function(){
  var start = Date.parse("Fri Jan 16 2015 21:18:33 GMT-0800 (PST)");
      var day = 1000*60*60*24;
      var elapsedDays = (Date.now() - start) / day;
      while(elapsedDays > 64){ elapsedDays = elapsedDays - 64;} //because we currently have 64 images
      return 'build/assets/images/' + Math.ceil(elapsedDays) + '.jpg';
};

var AppStore = merge(EventEmitter.prototype, {
  
  getData: function(){
    return _data;
  },

  init: function(){
    _data.displayName = window.localStorage.getItem("goodMorningAnna_displayName"); //get the display name from localStorage
    _data.location = JSON.parse(window.localStorage.getItem("goodMorningAnna_location") || null); //get and parse the object with the location from locastorage
    _data.imageSource = calcTodaysImage(); //get today's image number
  },

  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(payload){
  var data = payload.action.data;
  var actionType = payload.action.actionType;

  if(actionType === AppConstants.RECIEVE_LOCATION){
    window.localStorage.setItem("goodMorningAnna_location", JSON.stringify(data));
    _data.location = JSON.parse(window.localStorage.getItem("goodMorningAnna_location") || null);
  }
  if(actionType === AppConstants.TOGGLE_DATA_PANEL){
    _data.dataPanelOpen = _data.dataPanelOpen ? false : true;
  }
  if(actionType === AppConstants.TOGGLE_SETTINGS_PANEL){
    _data.settingsPanelOpen = _data.settingsPanelOpen ? false : true;
  }
  if(actionType === AppConstants.SET_DISPLAY_NAME){
    window.localStorage.setItem("goodMorningAnna_displayName", data);
    _data.displayName = window.localStorage.getItem("goodMorningAnna_displayName");
  }

  AppStore.emitChange();

});



module.exports = AppStore;
