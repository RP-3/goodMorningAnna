(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/sarith21/Documents/Programing/goodMorningAnna/js/backgroundImage.js":[function(require,module,exports){
//choose today's image and display it
module.exports = function(){
  var start = Date.parse("Fri Jan 16 2015 21:18:33 GMT-0800 (PST)");
  var day = 1000*60*60*24;
  var elapsedDays = (Date.now() - start) / day;
  while(elapsedDays > 64){ elapsedDays = elapsedDays - 64;}
  var src = './images/' + Math.ceil(elapsedDays) + '.jpg';

  var img = document.createElement('img');
  img.src = src;
  img.className = 'bg';
  img.style.zIndex = '-1';
  document.body.appendChild(img);
};

},{}],"/Users/sarith21/Documents/Programing/goodMorningAnna/js/greeting.js":[function(require,module,exports){
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
    greeting.innerHTML = "Good " + timeOfDay + ", " + userName + ".";
  }, 100);

};

},{}],"/Users/sarith21/Documents/Programing/goodMorningAnna/js/main.js":[function(require,module,exports){
/*
Get name of user
*/
//TODO
var userName = 'Anna';

/*
choose today's image and display it
*/
require('./backgroundImage.js')();

/*
Parse out today's time and greeting and display it
*/
require('./greeting.js')(userName);


/*
Fetch the location and weather and display it
*/
require('./weatherWidget.js')();


/*
Set up firebae chat
*/


},{"./backgroundImage.js":"/Users/sarith21/Documents/Programing/goodMorningAnna/js/backgroundImage.js","./greeting.js":"/Users/sarith21/Documents/Programing/goodMorningAnna/js/greeting.js","./weatherWidget.js":"/Users/sarith21/Documents/Programing/goodMorningAnna/js/weatherWidget.js"}],"/Users/sarith21/Documents/Programing/goodMorningAnna/js/weatherWidget.js":[function(require,module,exports){
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
          //response.currently.icon
          //response.currently.aparentTemperature
      }
    });

  });
};

},{}]},{},["/Users/sarith21/Documents/Programing/goodMorningAnna/js/main.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwianMvYmFja2dyb3VuZEltYWdlLmpzIiwianMvZ3JlZXRpbmcuanMiLCJqcy9tYWluLmpzIiwianMvd2VhdGhlcldpZGdldC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vY2hvb3NlIHRvZGF5J3MgaW1hZ2UgYW5kIGRpc3BsYXkgaXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXtcbiAgdmFyIHN0YXJ0ID0gRGF0ZS5wYXJzZShcIkZyaSBKYW4gMTYgMjAxNSAyMToxODozMyBHTVQtMDgwMCAoUFNUKVwiKTtcbiAgdmFyIGRheSA9IDEwMDAqNjAqNjAqMjQ7XG4gIHZhciBlbGFwc2VkRGF5cyA9IChEYXRlLm5vdygpIC0gc3RhcnQpIC8gZGF5O1xuICB3aGlsZShlbGFwc2VkRGF5cyA+IDY0KXsgZWxhcHNlZERheXMgPSBlbGFwc2VkRGF5cyAtIDY0O31cbiAgdmFyIHNyYyA9ICcuL2ltYWdlcy8nICsgTWF0aC5jZWlsKGVsYXBzZWREYXlzKSArICcuanBnJztcblxuICB2YXIgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gIGltZy5zcmMgPSBzcmM7XG4gIGltZy5jbGFzc05hbWUgPSAnYmcnO1xuICBpbWcuc3R5bGUuekluZGV4ID0gJy0xJztcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpbWcpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXNlck5hbWUpe1xuXG4gIHZhciBjbG9jaywgaG91cnMsIG1pbnV0ZXMsIGdyZWV0aW5nLCB0aW1lT2ZEYXk7XG4gIHNldEludGVydmFsKGZ1bmN0aW9uKCl7XG4gICAgLy91cGRhdGUgY2xvY2tcbiAgICBjbG9jayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9jaycpO1xuICAgIGhvdXJzID0gbmV3IERhdGUoKS5nZXRIb3VycygpLnRvU3RyaW5nKCk7XG4gICAgaG91cnMgPSBob3Vycy5sZW5ndGggPCAyID8gJzAnICsgaG91cnMgOiBob3VycztcbiAgICBtaW51dGVzID0gbmV3IERhdGUoKS5nZXRNaW51dGVzKCkudG9TdHJpbmcoKTtcbiAgICBtaW51dGVzID0gbWludXRlcy5sZW5ndGggPCAyID8gJzAnICsgbWludXRlcyA6IG1pbnV0ZXM7XG4gICAgY2xvY2suaW5uZXJIVE1MID0gaG91cnMgKyBcIjpcIiArIG1pbnV0ZXM7XG5cbiAgICAvL3VwZGF0ZSBtb3JuaW5nL2V2ZW5pbmcgaW4gdXNlciBncmVldGluZ1xuICAgIGdyZWV0aW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dyZWV0aW5nJyk7XG4gICAgaG91cnMgPSBuZXcgRGF0ZSgpLmdldEhvdXJzKCk7XG4gICAgaWYoaG91cnMgPCAyNCkgdGltZU9mRGF5ID0gJ2V2ZW5pbmcnO1xuICAgIGlmKGhvdXJzIDwgMTcpIHRpbWVPZkRheSA9ICdhZnRlcm5vb24nO1xuICAgIGlmKGhvdXJzIDwgMTIpIHRpbWVPZkRheSA9ICdtb3JuaW5nJztcbiAgICBncmVldGluZy5pbm5lckhUTUwgPSBcIkdvb2QgXCIgKyB0aW1lT2ZEYXkgKyBcIiwgXCIgKyB1c2VyTmFtZSArIFwiLlwiO1xuICB9LCAxMDApO1xuXG59O1xuIiwiLypcbkdldCBuYW1lIG9mIHVzZXJcbiovXG4vL1RPRE9cbnZhciB1c2VyTmFtZSA9ICdBbm5hJztcblxuLypcbmNob29zZSB0b2RheSdzIGltYWdlIGFuZCBkaXNwbGF5IGl0XG4qL1xucmVxdWlyZSgnLi9iYWNrZ3JvdW5kSW1hZ2UuanMnKSgpO1xuXG4vKlxuUGFyc2Ugb3V0IHRvZGF5J3MgdGltZSBhbmQgZ3JlZXRpbmcgYW5kIGRpc3BsYXkgaXRcbiovXG5yZXF1aXJlKCcuL2dyZWV0aW5nLmpzJykodXNlck5hbWUpO1xuXG5cbi8qXG5GZXRjaCB0aGUgbG9jYXRpb24gYW5kIHdlYXRoZXIgYW5kIGRpc3BsYXkgaXRcbiovXG5yZXF1aXJlKCcuL3dlYXRoZXJXaWRnZXQuanMnKSgpO1xuXG5cbi8qXG5TZXQgdXAgZmlyZWJhZSBjaGF0XG4qL1xuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7XG4gIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oZnVuY3Rpb24ocG9zaXRpb24pe1xuICAgIHZhciBsYXQgPSBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGU7XG4gICAgdmFyIGxvbmcgPSBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlO1xuXG4gICAgLy9jYiBmdW5jdGlvbiB0byBkaXNwbGF5IHdlYXRoZXIgd2hlbiB3ZSBrbm93IGl0XG5cbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiBcImh0dHBzOi8vYXBpLmZvcmVjYXN0LmlvL2ZvcmVjYXN0LzJmOGVmZTc0MTMyNGJkNjcwYzkxYzRjZDU5M2E0MDYyL1wiK2xhdCtcIixcIitsb25nK1wiP3VuaXRzPXNpXCIsXG4gICAgICBqc29ucDogXCJjYWxsYmFja1wiLFxuICAgICAgZGF0YVR5cGU6IFwianNvbnBcIixcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCByZXNwb25zZSApIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyggcmVzcG9uc2UgKTsgLy8gc2VydmVyIHJlc3BvbnNlXG4gICAgICAgICAgLy9yZXNwb25zZS5jdXJyZW50bHkuaWNvblxuICAgICAgICAgIC8vcmVzcG9uc2UuY3VycmVudGx5LmFwYXJlbnRUZW1wZXJhdHVyZVxuICAgICAgfVxuICAgIH0pO1xuXG4gIH0pO1xufTtcbiJdfQ==
