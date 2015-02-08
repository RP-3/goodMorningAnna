var express = require('express');
var jwt = require('../../helpers/jwtAuth.js');

module.exports = function(app, db){

  var router = express.Router();

  router.use(jwt.authorise); //grants access to req.__AUTHORISED_EMAIL & req.__AUTHORISED_id

  require('./get_all')(router, db);
  require('./requestContact')(router, db);
  require('./acceptContact')(router, db);
  require('./updateAlias')(router, db);
  require('./blockContact')(router, db);

  //TODO: reset password etc.

  app.use('/contacts', router);

};
