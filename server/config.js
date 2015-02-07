var configs = {};

//set up postgres connection
var Knex = require('knex');
var knex = Knex.initialize({
  client: 'pg',
  connection: {
    host     : 'localhost',
    port     : 5432,
    database : 'goodmorninganna'
  }
});
configs.db = knex;

//set up AWS bucket connection
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./aws.json');
configs.s3 = new AWS.S3({Bucket: 'goodmorninganna0'});

module.exports = configs;
