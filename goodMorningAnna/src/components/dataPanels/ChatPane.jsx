var React = require('react');

var Firebase = require('firebase');
var messageRef = new Firebase('https://goodmorninganna.firebaseIO.com/messages');

var ChatPane = React.createClass({
  getInitialState: function(){
    return {
      messages: [],
      value: ''
    };
  },

  messageRef: null,

  _updateStateFromFirebase: function(snapshot){
    var data = snapshot.val();
    var messageArray = [];
    for(var message in data){
      messageArray.push(data[message]);
    }
    this.setState({messages: messageArray});
  },

  componentWillMount: function () {
    var that = this;
    messageRef
    .limitToLast(25)
    .on('value', that._updateStateFromFirebase);
    window.addEventListener('resize', this.render.bind(that));
  },

  componentWillUnmount: function () {
    messageRef.off('value', this._updateStateFromFirebase);
    window.removeEventListener('resize', this.render.bind(this));
  },

  _parseMessages: function(){
    if(this.state.messages.length){
      return this.state.messages.sort(function(a, b){
        return a.time - b.time;
      })
      .map(function(element, index){
        return (<p className='message' key={index}><strong>{element.sender+": "}</strong>{element.text}</p>);
      });
    }else{
      return [<p className="message" key={0}><strong>{"Computer Says: "}</strong>{"It looks like your internet is either not working, or a little slow."}</p>,
              <p className="message" key={1}><strong>{"Computer Says: "}</strong>{"Chat et al. won't work if you're not connected."}</p>];
    }
  },

  _handleSubmit: function(e){
    if(e.keyCode === 13){
      e.preventDefault();
      e.stopPropagation();
      var message = e.target.value;
      messageRef.push({
        sender: this.props.displayName || "anonymous",
        text: message,
        time: Date.now()
      });
      this.setState({value: ''});
    }
  },

  _handleChange: function(e){
    this.setState({value: e.target.value});
  },

  render: function(){
    var messages = this._parseMessages();
    var height = window.innerHeight - (150 + 35 + 48);

    return (
      <div>
        <div className="divider">Black Board</div>
        <div style={{overflowY: 'scroll', height: height}}>
          {messages}
        </div>

        <div className="input-box">
          <div className="divider">Chalk</div>
          <textarea
            className="text-input"
            value={this.state.value}
            onChange={this._handleChange}
            onKeyUp={this._handleSubmit}>
          </textarea>
        </div>
      </div>
    );
  }
})

module.exports = ChatPane;
