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
