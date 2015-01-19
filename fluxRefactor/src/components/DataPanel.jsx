var React = require('react');

var ChatPane = require('./dataPanels/ChatPane');

var DataPanel = React.createClass({
  getInitialState: function(){
    return {};
  },

  render: function(){
    return (
    <div className="data-panel" style={{zIndex: this.props.dataPanelOpen ? "1" : "0"}}>
      <div className="generic-button" id="partner">
        <i className="fa fa-home fa-2x button-icon"></i>
      </div>
      <ChatPane displayName={this.props.displayName}/>
    </div>
    );
  }
})

module.exports = DataPanel;
