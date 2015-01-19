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
    })
    .catch(function(err){
      console.log("Error creating user: ", err);
      res.sendStatus(500);
    });

  });

  /*
  Check the username and password match.
  @param email string
  @param password string
  */
  router.post('/login', function (req, res, next){
    //parse and handle missing data
    var email = req.body.email;
    var password = req.body.password;
    if(typeof email !== 'string' || typeof password !== 'string'){
      res.sendStatus(400);
      return;
    }
    email = email.toLowerCase();

     db
    //fetch the requester's details
    .select()
    .from('users')
    .where('email', email)

    //check if the email is valid
    .then(function(rows){
      if(rows.length === 0){
        res.sendStatus(401);
        throw new Error('User does not exist');
      }
      accountSummary = rows[0];
      //check if the hashed password matches the one in the database
      return bcrypt.compareAsync(password, accountSummary.password); //returns a boolean
    })
    //send the result
    .then(function(result){
      if(result){
        res.sendStatus(200);
        //TODO: generate and send a JWT!
      }else{
        res.sendStatus(401);
      }
    })
    .catch(function(err){
      if(err.message !== 'User does not exist'){
        console.log("Error creating user: ", err);
        res.sendStatus(500);
      }
    });


  });

  /*
  TODO: implement
  change password in that account
  router.post('/changePassword', function (req, res, next){

  });
  */

  app.use('/auth', router);

};


