module.exports = function(userName){

  var clock, hours, minutes, greeting, timeOfDay;
  setInterval(function(){
    //update clock
    clock = document.getElementById('clock');
    hours = new Date().getHours().toString();
    hours = hours.length < 2 ? '0' + hours : hours;
    minutes = new Date().getMinutes().toString();
    minutes = minutes.length < 2 ? '0' + minutes : minutes;
    clock.innerHTML = hours + ":" + minutes;

    //update morning/evening in user greeting
    greeting = document.getElementById('greeting');
    hours = new Date().getHours();
    if(hours < 24) timeOfDay = 'evening';
    if(hours < 17) timeOfDay = 'afternoon';
    if(hours < 12) timeOfDay = 'morning';
    greeting.innerHTML = "Good " + timeOfDay + ", " + (userName || '______') + ".";
  }, 100);

};
