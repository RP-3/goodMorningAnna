//load connections to services
var db = require('./config.js').db;
var s3 = require('./config.js').s3;

var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(3000);
