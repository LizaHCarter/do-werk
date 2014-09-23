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
  describe('.findById', function(){
    it('should find a happy hour by its id', function(done){
      happyHour.findById('000000000000000000000001', function(err, place){
        expect(place.name).to.equal('12 south taproom');
        done();
      });
    });
  });
  describe('findByNeighborhood', function(){
    it('should find all places for a neighborhood', function(done){
      happyHour.findByNeighborhood('sobro', function(err, places){
        expect(places.length).to.equal(2);
        done();
      });
    });
  });

  describe('findByDay', function(){
    it('should find all places with happy hours on a given day', function(done){
      happyHour.findByDay('m', function(err, places){
        expect(places.length).to.equal(53);
        done();
      });
    });
  });
  describe('findToday', function(){
    it('should find all places with happy hours today', function(done){
      happyHour.findToday(function(err, places){
        expect(places.length).to.equal(56);
        done();
      });
    });
  });

//Last braces
});
