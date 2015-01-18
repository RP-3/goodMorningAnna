var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';

var _data = {
  message: 'Data from Store',
  displayName: null,
  imageSource: null
};

var AppStore = merge(EventEmitter.prototype, {
  
  getData: function(){
    return _data;
  },

  init: function(){
    //get the display name from localStorage
    _data.displayName = window.localStorage.getItem("goodMorningAnna_displayName");

    //get today's image and display it
    var start = Date.parse("Fri Jan 16 2015 21:18:33 GMT-0800 (PST)");
    var day = 1000*60*60*24;
    var elapsedDays = (Date.now() - start) / day;
    while(elapsedDays > 64){ elapsedDays = elapsedDays - 64;} //because we currently have 64 images
    _data.imageSource = 'build/assets/images/' + Math.ceil(elapsedDays) + '.jpg';

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
  var action = payload.action;
  console.log('STORE DISPATCHER REGISTER', action);

  if(action.actionType === AppConstants.EXAMPLE_CONSTANT){
    var text = action.text + ' to Dispatcher to Store and back';
    _data.message = text;
  }

  AppStore.emitChange();

});



module.exports = AppStore;
