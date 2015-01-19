//load connections to services
var db = require('./config.js').db;
var s3 = require('./config.js').s3;

var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var morgan = require('morgan');
var app = express();

//set up middleware stack
app.use( bodyParser.json() ); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies
app.use(multer());// for parsing multipart/form-data
app.use(morgan('dev')); //generall logging

//load routes
var authRouter = require('./routes/auth')(app, db);

app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(3000);
