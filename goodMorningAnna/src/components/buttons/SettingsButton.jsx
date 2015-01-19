var React = require('react');

var ChatButton = React.createClass({

  handleClick: function(e){
    this.props.handleSelect("settingsPanel");
  },
  
  render: function(){
    return (
        <div className={"settings-button " + (this.props.settingsPanelOpen === true ? "clicked-button" : "")} onClick={this.handleClick}>
          <i className="fa fa-cogs fa-2x button-icon"></i>
        </div>
      );
  }
})

module.exports = ChatButton;
