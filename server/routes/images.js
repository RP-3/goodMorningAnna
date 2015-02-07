var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));
var express = require('express');
var multer = require('multer');
var jwt = require('../helpers/jwtAuth');
var fs = require('fs');

module.exports = function(app, db, s3){

  var router = express.Router();

  router.use('/upload', function(req, res, next){
    if(req.method !== 'POST') return res.status(405).send('Only POST requests to this endpoint.');
    next();
  });

  router.use('/upload', jwt.authorise);

  router.use('/upload', function(req, res, next){
    //write file upload attempt to DB
    db('images')
    .insert({owner_email: req.__AUTHORISED_EMAIL})
    .returning('id')
    .then(function(id){
      req.__IMAGE_ID = id[0];
      next();
    })
    .catch(function(err){
      console.log("Error writing file entry to DB.", err);
      res.status(500).send("Error writing file entry to DB.");
    });
  });

  router.use('/upload', function(req, res, next){
    //hacky but necessary to access req/res objects on completion
    var handler = multer({
      dest: './uploads/',
      limits:{
        fileSize: 5000000 //5mb limit
      },

      onFileSizeLimit: function (file) {
        fs.unlink('./' + file.path); // delete the partially written file
        
        db('images') //log file failure to DB
        .where({id: req.__IMAGE_ID})
        .update({
          success: false,
          size: null,
          name: null,
          url: null
        })
        .then(function(){
          console.log('Rejected image.');
          res.status(400).send("Cannot store files > 5mb.");
        })
        .catch(function(err){
          console.log('Error logging failed upload: ', err);
        });
      },

      onFileUploadComplete: function (file) {
        if(file.truncated === true) return; //already taken care of above
        
        db('images') //log file success to DB
        .where({id: req.__IMAGE_ID})
        .update({
          success: true,
          size: file.size,
          name: file.name,
          url: null //TODO: save to S3 bucket instead of local disk
        })
        .then(function(){
          res.sendStatus(200);
        })
        .catch(function(err){
          if(err.message !== "Can't set headers after they are sent."){
            console.log('Error logging successful upload: ', err);
          }
        });
      }
    });

    handler(req, res, next);

  });


  /*
  Upload an image. This will transfer it to an S3 bucket
  and return a link to it.
  @param email (for now! use JWTs later...)
  */
  router.post('/upload', function (req, res, next){
    if(!Object.keys(req.files).length){
      db('images')
      .where({id: req.__IMAGE_ID})
      .del()
      .then(function(){
        res.status(400).send("No file detected");
      })
      .catch(function(err){
        console.log("Error logging empty upload: ", err);
      });
    }

  });

  /*
  Get all urls for all images a user uploaded.
  @param email string
  */
  router.get('/', function (req, res, next){

  });

  app.use('/images', router);

};
