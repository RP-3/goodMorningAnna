var React = require('react');

var WeatherStore = require('../stores/WeatherStore');
var WeatherActions = require('../actions/WeatherActions');

// for picking an icon to display
var forecastOptions = {
  clear_day: "wi-day-sunny",
  clear_night: "wi-night-clear",
  rain: "wi-rain",
  snow: "wi-snow",
  sleet: "wi-sleet",
  wind: "wi-strong-wind",
  fog: "wi-fog",
  cloudy: "wi-cloudy",
  partly_cloudy_day: "wi-day-cloudy",
  partly_cloudy_night: "wi-night-cloudy",
};

function getDataFromWeatherStore(){
  return WeatherStore.getData()
};

var WeatherBox = React.createClass({

  getInitialState: function(){
    return WeatherStore.getData();
  },

  _onChange: function(){
    this.setState(getDataFromWeatherStore());
  },

  componentWillReceiveProps: function (nextProps) {
    if(nextProps.location){
      if(!this.state.weather){
        WeatherActions.fetchWeather(nextProps.location);
      }else if((Date.now() - this.state.weather.time) > 1000*60*10){ //fetch at most, once every 10 mins
        WeatherActions.fetchWeather(nextProps.location);
      }
    }
  },

  componentDidMount: function(){
    WeatherStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    WeatherStore.removeChangeListener(this._onChange);
  },

  _parseDisplayInfo: function(weatherData, forecastOptions){
    if(!weatherData) return {};
    var icon = weatherData.currently.icon, result = {};
    //parse out the icon
    icon = icon.replace(/\-/g, '_');
    result.icon = forecastOptions[icon];
    //parseout max and min temp
    var temperature = Math.round(weatherData.currently.temperature);
    var max = Math.round(weatherData.daily.data[0].temperatureMax);
    result.tempString = temperature + '/' + max;
    return result;
  },
  
  render: function(){
    var display = this._parseDisplayInfo(this.state.weather, forecastOptions);
    return (
      <div style={{height:'275px'}}>
        <div className="weatherBox">
          <i id="weathericon" className={"wi " + (display.icon || "wi-thermometer-exterior") + " fa-2x"}></i>
          <div className="temperature"><span id="temperature">{ display.tempString || "current/max"}</span><i className="wi wi-celsius"></i></div>
        </div>
      </div>
      );
  }
})

module.exports = WeatherBox;
