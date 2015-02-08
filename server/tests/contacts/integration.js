var mocha = require('mocha'),
    Promise = require('bluebird'),
    chai = require("chai"),
    expect = chai.expect,
    should = chai.should,
    rp = require('request-promise');

//testing globals
var activationKey,
    authToken_randomUser,
    requests,
    authToken_anna;

describe('Contacts route', function(){

  this.timeout(4000); //sending an email can take a while

  /*
    BEGIN SETUP
  */

  it('should create a second test user', function(done){

    rp({
      url: 'http://localhost:3000/auth/createUser',
      method: 'POST',
      json: true,
      body: {
        email: 'randomUser@testDomain.com',
        password: 'fooBot',
        alias: 'randomUser'
      }
    })
    .then(function(data){
      expect(data).to.be.ok;
      activationKey = data;

      return rp({
        url: 'http://localhost:3000/auth/activate',
        method: 'POST',
        json: true,
        body: {
          email: 'randomUser@testDomain.com',
          activationKey: activationKey
        }
      });

    })

    .then(function(data){

      return rp({
        url: 'http://localhost:3000/auth/login',
        method: 'POST',
        json: true,
        body: {
          email: 'randomUser@testDomain.com',
          password: 'fooBot'
        }
      });

    })
    .then(function(data){
      expect(data.alias).to.equal('randomUser');
      authToken_randomUser = data;
      
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
      authToken_anna = data;
      done();
    })
    .catch(function(error){
      console.log('error: ', error.message);
      expect(error).to.be.a('null');
      done();
    });

  });

  /*
    END SETUP
  */

  it('should create a contact request', function(done){
    
    rp({
      url: 'http://localhost:3000/contacts/request',
      method: 'POST',
      headers: {
        Authorization: authToken_randomUser.token
      },
      json: true,
      body: {
        email: 'goodmorningannarogers@gmail.com',
        alias: 'Huggada'
      }
    })
    .then(function(data){
      done();
    })
    .catch(function(error){
      console.log('error: ', error.error);
      expect(error).to.be.a('null');
      done();
    });

  });

  it('should handle duplicate requests', function(done){
    
    rp({
      url: 'http://localhost:3000/contacts/request',
      method: 'POST',
      headers: {
        Authorization: authToken_randomUser.token
      },
      json: true,
      body: {
        email: 'goodmorningannarogers@gmail.com',
        alias: 'Huggada'
      }
    })
    .then(function(data){
      done();
    })
    .catch(function(error){
      console.log('error: ', error.error);
      expect(error).to.be.a('null');
      done();
    });

  });

  it('should get all contacts', function(done){
    
    rp({
      url: 'http://localhost:3000/contacts/all',
      method: 'GET',
      headers: {
        Authorization: authToken_randomUser.token
      },
    })
    .then(function(data){
      requests = JSON.parse(data);
      done();
    })
    .catch(function(error){
      console.log('error: ', error.error);
      expect(error).to.be.a('null');
      done();
    });

  });

  it('should accept a contact request', function(done){

    rp({
      url: 'http://localhost:3000/contacts/accept',
      method: 'POST',
      headers: {
        Authorization: authToken_anna.token
      },
      json: true,
      body: {
        requester_id: requests[0].requester_id,
        requestee_id: requests[0].requestee_id,
        alias: 'hu-gga-da'
      }
    })
    .then(function(data){
      console.log('data: ', data);
      done();
    })
    .catch(function(error){
      console.log('error: ', error.error);
      expect(error).to.be.a('null');
      done();
    });

  });

  it('should update a contact alias', function(done){

    rp({
      url: 'http://localhost:3000/contacts/alias',
      method: 'PUT',
      headers: {
        Authorization: authToken_anna.token
      },
      json: true,
      body: {
        requester_id: requests[0].requester_id,
        requestee_id: requests[0].requestee_id,
        alias: 'hu-gga-da'
      }
    })
    .then(function(data){
      console.log('data: ', data);
      done();
    })
    .catch(function(error){
      console.log('error: ', error.error);
      expect(error).to.be.a('null');
      done();
    });

  });

  it('should delete a contact', function(done){

    rp({
      url: 'http://localhost:3000/contacts/accept',
      method: 'POST',
      headers: {
        Authorization: authToken_anna.token
      },
      json: true,
      body: {
        requester_id: requests[0].requester_id,
        requestee_id: requests[0].requestee_id,
        alias: 'hu-gga-da'
      }
    })
    .then(function(data){
      console.log('data: ', data);
      done();
    })
    .catch(function(error){
      console.log('error: ', error.error);
      expect(error).to.be.a('null');
      done();
    });

  });


});
