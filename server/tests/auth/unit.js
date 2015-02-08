var mocha = require('mocha'),
    Promise = require('bluebird'),
    chai = require("chai"),
    expect = chai.expect,
    should = chai.should,
    rp = require('request-promise');

//testing globals
var activationKey;

describe('Authentication route', function(){

  this.timeout(4000); //sending an email can take a while

  it('should create a new user', function(done){

    rp({
      url: 'http://localhost:3000/auth/createUser',
      method: 'POST',
      json: true,
      body: {
        email: 'goodmorningannarogers@gmail.com',
        password: 'fooBot',
        alias: 'Rohan'
      }
    })
    .then(function(data){
      expect(data).to.be.ok;
      activationKey = data;
      done();
    })
    .catch(function(error){
      expect(error).to.be.a('null');
      done();
    });

  });

  it('should return a 200 if the user already exists', function(done){

    rp({
      url: 'http://localhost:3000/auth/createUser',
      method: 'POST',
      json: true,
      body: {
        email: 'goodmorningannarogers@gmail.com',
        password: 'fooBot',
        alias: 'Rohan'
      }
    })
    .then(function(data){
      expect(data).to.equal("User already exists");
      done();
    })
    .catch(function(error){
      expect(error).to.be.a('null');
      done();
    });

  });

  it('should activate a user account', function(done){

    rp({
      url: 'http://localhost:3000/auth/activate',
      method: 'POST',
      json: true,
      body: {
        email: 'goodmorningannarogers@gmail.com',
        activationKey: activationKey
      }
    })
    .then(function(data){

      return rp({
        url: 'http://localhost:3000/auth/login',
        method: 'POST',
        json: true,
        body: {
          email: 'goodmorningannarogers@gmail.com',
          password: 'fooBot'
        }
      });

    })
    .then(function(data){
      expect(data.alias).to.equal('Rohan');
      done();
    })
    .catch(function(error){
      console.log('error: ', error.error);
      expect(error).to.be.a('null');
      done();
    });

  });

  it('should return a 400 if the input is invalid', function(done){
    rp({
      url: 'http://localhost:3000/auth/createUser',
      method: 'POST',
      json: true,
      body: {
        email: 'goodmorningannarogers@gmail.com',
        password: '',
        alias: ''
      }
    })
    .then(function(data){
      expect(data).to.be.a('null');
      done();
    })
    .catch(function(error){
      expect(error.error).to.be.equal('Password must be provided');
      done();
    });
  });

  it('should authenticate a correct username and password combination', function(done){

    rp({
      url: 'http://localhost:3000/auth/login',
      method: 'POST',
      json: true,
      body: {
        email: 'goodmorningannarogers@gmail.com',
        password: 'fooBot'
      }
    })
    .then(function(data){
      expect(data.alias).to.equal('Rohan');
      done();
    })
    .catch(function(error){
      console.log('error', error.error);
      expect(error).to.be.a('null');
      done();
    });

  });

  it('should refuse to authenticate an incorrect username and password combination', function(done){
    
    rp({
      url: 'http://localhost:3000/auth/login',
      method: 'POST',
      json: true,
      body: {
        email: 'goodmorningannarogers@gmail.com',
        password: 'fooBoo'
      }
    })
    .then(function(data){
      expect(data).to.be.a('null');
      done();
    })
    .catch(function(error){
      expect(error.error).to.equal('Unauthorized');
      done();
    });

  });

  // it('should refuse to authenticate an incorrect username and password combination', function(done){
    
  //   rp({
  //     url: 'http://localhost:3000/auth/login',
  //     method: 'POST',
  //     json: true,
  //     body: {
  //       email: 'goodmorningannarogers@gmail.com',
  //       password: 'fooBoo'
  //     }
  //   })
  //   .then(function(data){
  //     expect(data).to.be.a('null');
  //     done();
  //   })
  //   .catch(function(error){
  //     expect(error.error).to.equal('Unauthorized');
  //     done();
  //   });

  // });

});
