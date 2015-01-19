var React = require('react');

var Greeting = React.createClass({
  
  getInitialState: function(){
    return {greeting: this._getGreeting()};
  },

  _getGreeting: function(){
    var hours = new Date().getHours(), timeOfDay;
    if(hours < 24) timeOfDay = 'evening';
    if(hours < 17) timeOfDay = 'afternoon';
    if(hours < 12) timeOfDay = 'morning';
    return "Good " + timeOfDay + ", " + (this.props.displayName || '______') + ".";
  },

  clockReference: null,

  componentWillMount: function () {
    this.clockReference = setInterval(function(){
      if(this.state.greeting !== this._getGreeting()){ //not relying on react's diffing algorithm
        this.setState({greeting: this._getGreeting()});
      }
    }.bind(this), 500);
  },

  componentWillUnmount: function(){
    clearInterval(this.clockReference);
  },
  
  render: function(){
    return (
        <p id="greeting" className="text-center" style={{color:'white', fontSize:'50px', fontWeight:'bolder'}}>
          {this.state.greeting}
        </p>
      );
  }
})

module.exports = Greeting;
