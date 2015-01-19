//load connections to services
var db = require('./config.js').db;
var s3 = require('./config.js').s3;

var express = require('express');
var morgan = require('morgan');
var app = express();

//set up middleware stacl
app.use(morgan('dev'));


app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(3000);
