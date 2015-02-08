var types = require('./typeChecks.js');

var validators = {

  email: function(reqBody){
    if(!reqBody.email) return 'Email must be provided';
    //check emails are strings
    if(!types(reqBody.email, 'string')) return 'Email must be a string';
    //check emails fit accepted form
    if(!reqBody.email.match(/\w+@\w+\.\w+/) || reqBody.email.match(/\w+@\w+\.\w+/).length !== 1){
      return 'Type Error: Invalid email format. Emails must fit the pattern /w+@w+.w+/';
    }
    return true;
  },

  password: function(reqBody){
    if(!reqBody.password) return 'Password must be provided';
    //check passwords are strings
    if(!types(reqBody.password, 'string')) return 'Password must be a string';
    //minimum six char length
    if(reqBody.password.length < 6){
      return 'Type Error: passwords must be at least six characters long.';
    }
    return true;
  },

  activationKey: function(reqBody){
    if(!reqBody.activationKey) return 'ActivationKey must be provided';
    //check activationKeys are strings
    if(!types(reqBody.activationKey, 'string')) return 'ActivationKey must be a string';

    if(reqBody.activationKey.length !== 10) return 'Invalid Activation Key';
  },

  alias: function(reqBody){
    if(!reqBody.alias) return 'alias must be provided';
    //check aliass are strings
    if(!types(reqBody.alias, 'string')) return 'alias must be a string';
    return true;
  },

  requester_id: function(reqBody){
    if(reqBody.requester_id === undefined) return 'requester_id must be provided';
    //check requester_ids are numbers
    if(!types(reqBody.requester_id, 'number')) return 'requester_id must be a number';
    return true;
  },

  requestee_id: function(reqBody){
    if(!reqBody.requestee_id) return 'requestee_id must be provided';
    //check requestee_ids are numbers
    if(!types(reqBody.requestee_id, 'number')) return 'requestee_id must be a number';
    return true;
  }

};

module.exports = function(reqBody, props){

  for(var i=0; i<props.length; i++){

    if(!validators.hasOwnProperty(props[i])) throw new Error('Attempted to validate unknown prop: ', prop);

    if(typeof validators[props[i]](reqBody) === 'string') return validators[props[i]](reqBody);

  }

  return true;

};
