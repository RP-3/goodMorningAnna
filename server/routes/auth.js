var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));
var express = require('express');

module.exports = function(app, db){

  var router = express.Router();

  /*
  create an account
  @param email string
  @param password string
  @param [alias string]
  */
  router.post('/createUser', function (req, res, next){
    var email = req.body.email;
    var password = req.body.password;

    //handle missing data
    if(typeof email !== 'string' || typeof password !== 'string'){
      res.sendStatus(400);
      return;
    }

    email = email.toLowerCase();

    //salt and hash password
    bcrypt
    .genSaltAsync(10)
    .then(function(salt){
      return bcrypt.hashAsync(password, salt);
    })

    //set hashed password and insert
    .then(function(hash){
      return db('users')
      .insert({
        email: email,
        password: hash,
        alias: req.body.alias || null
      })
      .returning('*');
    })

    //TODO: email user to confirm
    .then(function(result){
      res.sendStatus(200);
    });

  });

  /*Check the username and password match.*/
  router.post('login', function (req, res, next){

  });

  /*change password in that account*/
  router.post('/changePassword', function (req, res, next){

  });

  app.use('/auth', router);

};


