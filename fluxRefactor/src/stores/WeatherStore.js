var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';

var _data = {
  weather: null
};

var WeatherStore = merge(EventEmitter.prototype, {
  
  getData: function(){
    return _data;
  },

  init: function(){
    _data.weather = JSON.parse(window.localStorage.getItem("goodMorningAnna_weather") || null);
    if(_data.weather !== null){

    }
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

  if(actionType === AppConstants.RECIEVE_WEATHER){
    //load up all the data we got
    window.localStorage.setItem("goodMorningAnna_weather", JSON.stringify(data));
    _data.weather = JSON.parse(window.localStorage.getItem("goodMorningAnna_weather") || null);
  }

  WeatherStore.emitChange();

});



module.exports = WeatherStore;
