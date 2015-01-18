var React = require('react');

//stores and actions
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
AppStore.init(); //get data from localStorage and calculate constants for the day

//components
var WeatherBox = require('./WeatherBox');
var Clock = require('./Clock');

function getAppState(){
  return AppStore.getData()
};

var APP = React.createClass({
  getInitialState: function(){
    return getAppState();
  },

  _onChange: function(){
    this.setState(getAppState());
  },

  componentDidMount: function(){
    AppStore.addChangeListener(this._onChange);
  },

  componentWillMount: function () {
    AppActions.getLocation();  
  },

  componentWillUnmount: function(){
    AppStore.removeChangeListener(this._onChange);
  },
  
  render: function(){
    return (
      <div className="container">
      <img src={this.state.imageSource} className="bg"></img>

        <WeatherBox location={this.state.location}/>

        <div className="row">
          <div style={{display:'flex', alignItems:'center'}}>
          </div>
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <div className="row">
                <Clock/>
              </div>
              <div className="row">
                <p id="greeting" className="text-center" style={{color:'white', fontSize:'50px', fontWeight:'bolder'}}></p>
              </div>
            </div>
            <div className="col-md-3"></div>
        </div>

        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4"></div>
          <div className="col-md-4"></div>
        </div>

      </div>
      );
  }
})

module.exports = APP;
