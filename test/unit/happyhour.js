'use strict';

var expect    = require('chai').expect,
    happyHour = require('../../server/models/happyhour'),
    dbConnect = require('../../server/lib/mongodb'),
    cp        = require('child_process'),
    Mongo     = require('mongodb'),
    db        = 'do-werk-test';

describe('happyHour', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new happy hour object', function(){
      var h = new happyHour();
      expect(h).to.be.instanceof(happyHour);
    });
  });

  describe('.all', function(){
    it('should get all happy hours from the database', function(done){
      happyHour.all(function(err, places){
        expect(places).to.have.length(61);
        done();
      });
    });
  });

//Last braces
});
