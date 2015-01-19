var React = require('react');
var AppActions = require('../actions/AppActions');

var SettingsPanel = React.createClass({

  getInitialState: function(){
    return {displayName: this.props.displayName};
  },

  _handleChange: function(e){
    AppActions.setDisplayName(e.target.value);
  },

  render: function(){
    return (
    <div className="settings-panel" style={{zIndex: this.props.settingsPanelOpen ? "1" : "0"}}>
      <div className="settings-box">
        <div className="divider"><strong>Settings</strong></div>
        <div className="divider">Your name</div>
        <div className="input-box" style={{position: 'relative', height: '45px'}}>
          <textarea
            className="text-input"
            defaultValue={this.props.displayName}
            onChange={this._handleChange}>
          </textarea>
        </div>
      </div>
    </div>
    );
  }
})

module.exports = SettingsPanel;
