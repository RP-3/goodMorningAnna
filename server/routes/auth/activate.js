var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));
var jwt = require('../../helpers/jwtAuth');
var validator = require('../../helpers/validateRequest');
var notify = Promise.promisify(require('../../helpers/sendActivationEmail'));
var genKey = require('../../helpers/genToken');

module.exports = function(router, db){
  router.post('/activate', function (req, res){
    //handle missing data
    var validation = validator(req.body, ['email', 'activationKey']);
    if(typeof validation === 'string'){
      res.status(400).send(validation);
      return;
    }

    var email = req.body.email.toLowerCase();
    var activationKey = req.body.activationKey;

    db('users')
    //fetch the requester's details
    .update({
      activated: true,
      activation_key: null
    })
    .where('email', email)
    .andWhere('activation_key', activationKey)

    //check if the email is valid
    .then(function(rows){
      console.log('rows: ', rows);
      if(rows.length === 0){
        res.sendStatus(401);
        throw new Error('User does not exist or activation key is invalid.');
      }
      res.sendStatus(200);
      //check if the hashed password matches the one in the database
    })
    //send the result
    .catch(function(err){
      console.log(err);
      res.status(500).send(err);
    });
  });

};
