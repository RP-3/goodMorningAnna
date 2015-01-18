var React = require('react');

//stores and actions
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
AppStore.init(); //get data from localStorage and calculate constants for the day

//components
var WeatherBox = require('./WeatherBox');
var Clock = require('./Clock');
var Greeting = require('./Greeting');
var ChatButton = require('./buttons/ChatButton');
var DataPanel = require('./DataPanel');

function getAppState(){
  var state = AppStore.getData()
  return state;
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

  handleSelect: function(target){ //where 'target' is the name of the element selected
    if(target === 'dataPanel'){
      AppActions.toggleDataPanel();
    }
  },
  
  render: function(){
    return (
      <div>
        <ChatButton handleSelect={this.handleSelect} dataPanelOpen={this.state.dataPanelOpen}/>
        <DataPanel dataPanelOpen={this.state.dataPanelOpen}/>
        <img src={this.state.imageSource} className="bg"></img>
        
        <div className="container">
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
                  <Greeting displayName={this.state.displayName}/>
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
      </div>
      );
  }
})

module.exports = APP;
