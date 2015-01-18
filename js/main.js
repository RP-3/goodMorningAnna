/*
Get name of user
*/
//TODO

$(document).on('ready', function(){
  /*setup settings panel*/
  require('./settings.js')();

  /*choose today's image and display it*/
  require('./backgroundImage.js')();

  /*Parse out today's time and greeting and display it*/
  require('./greeting.js')(window.localStorage.getItem("goodMorningAnna_userName"));

  /*Fetch the location and weather and display it*/
  require('./weatherWidget.js')();

  /*Set up firebase chat*/
  require('./chat.js')();

});
