var validator = require('../../helpers/validateRequest');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));
var jwt = require('../../helpers/jwtAuth');
var notify = Promise.promisify(require('../../helpers/sendActivationEmail'));
var genKey = require('../../helpers/genToken');

module.exports = function(router, db){
  
  router.post('/createUser', function (req, res){
    //handle missing data
    var validation = validator(req.body, ['email', 'password']);
    if(typeof validation === 'string'){
      res.status(400).send(validation);
      return;
    }

    var email = req.body.email.toLowerCase();
    var password = req.body.password;
    var activationKey = genKey(10);

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
        activation_key: activationKey,
        alias: req.body.alias || null
      })
      .returning('*');
    })

    //email user to confirm
    .then(function(result){
      //email activation key to user
      return notify(email, activationKey);
    })

    .then(function(confirmation){
      return res.status(200).send(activationKey);
    })

    .catch(function(err){
      //user already exists
      if(err.message.indexOf("duplicate key value violates unique constraint") !== -1){
        res.status(200).send("User already exists");
      }else{
        //all other cases
        console.log('[Error creating user]', err);
        res.status(500, err);
      }
    });

  });

};
