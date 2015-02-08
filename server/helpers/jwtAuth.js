var jwt = require('jwt-simple');

var tokenSecret = require('./genToken')();

//generate and send a token to the client after successful auth
module.exports.sendToken = function (req, res, user) {
  // build up the token
  var expiration = Date.now() + 1000*60*60*24*90; //90 days from now

  var unencodedToken = {
    id: user.id,
    email: user.email,
    exp: expiration
  };

  var token = jwt.encode(unencodedToken, tokenSecret);

  //send it to the client
  res.status(200)
  .type('application/json')
  .send({
    token: token,
    exp: expiration,
    alias: user.alias
  });

};

module.exports.authorise = function (req, res, next) {

  var token = req.header('Authorization');

  if (token) {
    try {

      var decodedToken = jwt.decode(token, tokenSecret);

      if (decodedToken.exp <= Date.now()) {
        res.status(401)
          .type('application/json')
          .send({ message: 'Auth token expired.' });
        return;
      }

      req.__AUTHORISED_EMAIL = decodedToken.email;
      req.__AUTHORISED_id = decodedToken.id;

      return next();

    } catch (err) {

      console.log("[JWT token error]: ", err);
      res.status(401)
        .type('application/json')
        .send({ message: 'Invalid auth token.' });
      return;

    }
  } else {

    console.log("[JWT token error]: no token");
    res.status(401)
      .type('application/json')
      .send({ message: 'No auth token provided.' });
    return;

  }

};
