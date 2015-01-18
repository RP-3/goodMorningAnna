var React = require('react');

function getTime(){
  var hours, minutes;
  hours = new Date().getHours().toString();
  hours = hours.length < 2 ? '0' + hours : hours;
  minutes = new Date().getMinutes().toString();
  minutes = minutes.length < 2 ? '0' + minutes : minutes;
  return hours + ":" + minutes;
}

var APP = React.createClass({
  getInitialState: function(){
    return {time: getTime()};
  },

  clockReference: null,

  componentWillMount: function () {
    this.clockReference = setInterval(function(){
      if(this.state.time !== getTime()){ //not relying on react's diffing algorithm
        this.setState({time: getTime()});
      }
    }.bind(this), 500);
  },

  componentWillUnmount: function(){
    clearInterval(this.clockReference);
  },
  
  render: function(){
    return (
        <h1 className="text-center" style={{color:'white', fontSize:'160px', fontWeight:'bolder'}}>
          {this.state.time}
        </h1>
      );
  }
})

module.exports = APP;
