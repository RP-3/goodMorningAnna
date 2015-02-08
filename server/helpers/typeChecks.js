var types = {

  string: function(arg){
    if(typeof arg !== 'string') return false;
    if(arg.length === 0) return false;
    return true;
  },

};

module.exports = function(argument, type){
  return (types[type](argument) === true) ? true : false;
};
