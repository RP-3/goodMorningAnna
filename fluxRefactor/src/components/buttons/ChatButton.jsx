var React = require('react');

var ChatButton = React.createClass({

  handleClick: function(e){
    this.props.handleSelect("dataPanel");
  },
  
  render: function(){
    return (
        <div id="chatbutton" className={"chat-button " + (this.props.dataPanelOpen === true ? "clicked-button" : "")} onClick={this.handleClick}>
          <i className="fa fa-wechat fa-2x button-icon"></i>
        </div>
      );
  }
})

module.exports = ChatButton;
