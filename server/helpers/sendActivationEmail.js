var nodemailer = require("nodemailer");
var wellknown = require('nodemailer-wellknown');
var config = wellknown('Gmail');

var transpoter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "goodmorningannarogers@gmail.com",
    pass: "umJHxsd2BekKJfzwMnmO"
   }
});

var preAmble = "Hey there,";
var intro = "Thanks for signing up for GoodMorningAnna";
var body = "Your activationKey is ";
var ending = "Please paste this into the 'Activation Key' field in the settings in any GoodMorningAnna tab.";
var signoff = "Thanks! \n\n And Good Morning =)";

module.exports = function(email, activationKey, cb){

  var message = preAmble + '\n' + intro + '\n' + body + activationKey + '.\n' + ending + '\n' + signoff;

  var mailOptions = {
    from: 'GoodMorningAdmin ✔ <goodmorningannarogers@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Good Morning!", // Subject line
    text: message // plaintext body
  };

  transpoter.sendMail(mailOptions, cb);

};
