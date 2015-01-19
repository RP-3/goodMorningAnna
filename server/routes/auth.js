var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));
var express = require('express');

module.exports = function(app, db){

  var router = express.Router();

  /*create an account*/
  router.post('/createUser', function (req, res, next){
    console.log('authRequest: ', req.body);
    res.sendStatus(200);
  });

  /*Check the username and password match.*/
  router.post('login', function (req, res, next){

  });

  /*change password in that account*/
  router.post('/changePassword', function (req, res, next){

  });

  app.use('/auth', router);

};


