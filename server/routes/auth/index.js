var express = require('express');

module.exports = function(app, db){

  var router = express.Router();

  require('./createUser')(router, db);
  require('./activate')(router, db);
  require('./login')(router, db);

  //TODO: reset password etc.

  app.use('/auth', router);

};
