var React = require('react');

var DataPane = React.createClass({
  getInitialState: function(){
    return {};
  },

  render: function(){
    return (
    <div className="data-panel" style={{zIndex: this.props.dataPanelOpen ? "1" : "0"}}>
      <div className="generic-button" id="partner">
        <i className="fa fa-home fa-2x button-icon"></i>
      </div>
      <div className="divider">Black Board</div>
      <div id="messagebox" style={{overflowY: 'scroll'}}>
        <p className="message"><strong>{"Computer Says: "}</strong>{"It looks like your internet is either not working, or a little slow."}</p>
        <p className="message"><strong>{"Computer Says: "}</strong>{"Chat et al. won't work if you're not connected."}</p>
      </div>

      <div className="input-box">
        <div className="divider">Chalk</div>
        <div id="inputbox" className="text-input" contentEditable></div>
      </div>
    </div>
    );
  }
})

module.exports = DataPane;
