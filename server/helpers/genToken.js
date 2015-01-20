module.exports = function(length){

  length = length || 40; //default to 40 character password

  var characterBank = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      result = '';

  for(var i=0; i<length; i++){
    result += characterBank[Math.floor(Math.random() * characterBank.length)];
  }

  return result;

};
