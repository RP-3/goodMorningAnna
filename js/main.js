/*
Get name of user
*/
//TODO
var userName = 'Anna';

$(document).on('ready', function(){

  /*choose today's image and display it*/
  require('./backgroundImage.js')();

  /*Parse out today's time and greeting and display it*/
  require('./greeting.js')(userName);


  /*Fetch the location and weather and display it*/
  require('./weatherWidget.js')();


  /*Set up firebase chat*/
  require('./chat.js')();

});
