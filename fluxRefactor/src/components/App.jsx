'use strict';

var React = require('react');

var AppStore = require('../stores/AppStore');
AppStore.init(); //get data from localStorage and calculate constants for the day
var AppActions = require('../actions/AppActions');


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

  componentWillUnmount: function(){
    AppStore.removeChangeListener(this._onChange);
  },

  handleClick: function(){
    AppActions.exampleAction('Data from View');
  },
  
  render: function(){
    return (
      <div className="container">
      <img src={this.state.imageSource} className="bg"></img>

          <div style={{height:'275px'}}>
            <div className="weatherBox">
              <i id="weathericon" className="wi wi-thermometer-exterior fa-2x"></i>
              <div className="temperature"><span id="temperature">current|max</span><i className="wi wi-celsius"></i></div>
            </div>
          </div>


        <div className="row">
          <div style={{display:'flex', alignItems:'center'}}>
          </div>
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <div className="row">
                <h1 id="clock" className="text-center" style={{color:'white', fontSize:'160px', fontWeight:'bolder'}}></h1>
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
