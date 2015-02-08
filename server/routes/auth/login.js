var validator = require('../../helpers/validateRequest');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));
var jwt = require('../../helpers/jwtAuth');
var notify = Promise.promisify(require('../../helpers/sendActivationEmail'));
var genKey = require('../../helpers/genToken');

module.exports = function(router, db){

  router.post('/login', function (req, res){
    //handle missing data
    var validation = validator(req.body, ['email', 'password']);
    if(typeof validation === 'string'){
      res.status(400).send(validation);
      return;
    }

    var email = req.body.email.toLowerCase();
    var password = req.body.password;

    var account;

     db
    //fetch the requester's details
    .select()
    .from('users')
    .where('email', email)
    .andWhere('activated', true)
    .returning()

    //check if the email is valid
    .then(function(rows){
      if(rows.length === 0){
        res.sendStatus(401);
        throw new Error('User does not exist');
      }
      account = rows[0];
      //check if the hashed password matches the one in the database
      return bcrypt.compareAsync(password, account.password); //returns a boolean
    })
    //send the result
    .then(function(result){
      if(result){
        jwt.sendToken(req, res, account);
      }else{
        //result is boolean false
        res.sendStatus(401);
        throw new Error('Incorrect email or password.');
      }
    })
    .catch(function(err){
      if(err.message !== 'User does not exist' || err.message !== 'Incorrect email or password.'){
        console.log("Error authenticating user: ", err);
      }else{
        if(!res.headerSent) res.sendStatus(500);
      }
    });

  });

};
