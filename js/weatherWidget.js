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
