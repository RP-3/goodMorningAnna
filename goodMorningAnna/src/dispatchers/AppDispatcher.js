var Dispatcher = require('flux').Dispatcher;
var copyProperties = require('react/lib/copyProperties');
var AppDispatcher = copyProperties(new Dispatcher(), {

  /**
   * A bridge function between the views and the dispatcher, marking the action
   * as a view action.  Another variant here could be handleServerAction.
   * @param  {object} action The data coming from the view.
   */
  handleViewAction: function(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  },

  //data coming from a server other than our own
  handleExternalAction: function(action) {
    this.dispatch({
      source: 'EXTERNAL_ACTION',
      action: action
    });
  },

  /*
  handleServerlAction: function(action) {
    this.dispatch({
      source: 'SERVER_ACTION',
      action: action
    });
  },
  */

  //data coming asynchronously from the local machine
  handleLocalAction: function(action) {
    this.dispatch({
      source: 'LOCAL_ACTION',
      action: action
    });
  },

});

module.exports = AppDispatcher;
