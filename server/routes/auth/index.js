var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));
var express = require('express');
var jwt = require('../../helpers/jwtAuth');
var validator = require('../../helpers/validateRequest');
var notify = Promise.promisify(require('../../helpers/sendActivationEmail'));
var genKey = require('../../helpers/genToken');

module.exports = function(app, db){

  var router = express.Router();

  require('./createUser')(router, db);
  require('./activate')(router, db);
  require('./login')(router, db);

  //TODO: reset password etc.

  app.use('/auth', router);

};
