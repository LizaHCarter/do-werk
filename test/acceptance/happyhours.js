/* global describe, before, beforeEach, it */

'use strict';

process.env.DB   = 'do-werk-test';

var expect  = require('chai').expect,
    cp      = require('child_process'),
    app     = require('../../server/index'),
    cookie  = null,
    request = require('supertest');

describe('happyhours', function(){
  before(function(done){
    request(app).get('/').end(done);
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [process.env.DB], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      request(app)
      .post('/login')
      .send('email=bob@aol.com')
      .send('password=1234')
      .end(function(err, res){
        cookie = res.headers['set-cookie'][0];
        done();
      });
    });
  });
  describe('post /login', function(){
    it('should not allow user to login if credentials are wrong', function(done){
      request(app)
      .post('/login')
      .send('email=bob@aol.com')
      .send('password=abcd')
      .end(function(err, res){
        expect(res.status).to.equal(401);
        done();
      });
    });
  });
  describe('delete /logout', function(){
    it('should log a user out', function(done){
      request(app)
      .delete('/logout')
      .set('cookie', cookie)
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.headers).to.have.property('x-authenticated-user', 'anonymous');
        done();
      });
    });
    it('should bounce a user out', function(done){
      request(app)
      .delete('/logout')
      .end(function(err, res){
        expect(res.status).to.equal(401);
        done();
      });
    });
  });
  describe('post /register', function(){
    it('should register a new user', function(done){
      request(app)
      .post('/register')
      .send('email=sue@aol.com')
      .send('password=1234')
      .end(function(err, res){
        cookie = res.headers['set-cookie'][0];
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should not allow user to register if already registered', function(done){
      request(app)
      .post('/register')
      .send('email=bob@aol.com')
      .send('password=1234')
      .end(function(err, res){
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  describe('get /happyhours', function(){
    it('should show all happyhours page', function(done){
      request(app)
      .get('/happyhours')
      .set('cookie', cookie)
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('all');
        done();
      });
    });
  });
  describe('get /happyhours/today', function(){
    it('should show all happyhours today', function(done){
      request(app)
      .get('/happyhours/today')
      .set('cookie', cookie)
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('beer');
        done();
      });
    });
  });
  describe('get /happyhours/000000000000000000000005', function(){
    it('should show a specific happyhour page', function(done){
      request(app)
      .get('/happyhours/000000000000000000000005')
      .set('cookie', cookie)
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('smokin');
        done();
      });
    });
  });
});
