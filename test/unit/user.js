'use strict';

var expect    = require('chai').expect,
    User      = require('../../server/models/user'),
    dbConnect = require('../../server/lib/mongodb'),
    cp        = require('child_process'),
    Mongo     = require('mongodb'),
    db        = 'do-werk-test';

describe('User', function(){
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
    it('should create a new User object', function(){
      var o = {
        username : 'sue',
        password : 'abcd',
        },
      u = new User(o);
      expect(u).to.be.instanceof(User);
    });
  });

  describe('.findById', function(){
    it('should find a user by its id', function(done){
      User.findById('a00000000000000000000001', function(err, user){
        expect(user.email).to.equal('bob@aol.com');
        done();
      });
    });
  });

  describe('#save', function(){
    it('should save a user', function(done){
      var u = new User(),
          o = {x:3, visible:'public', foo:'bar'};

      u.baz = 'bim';
      u.save(o, function(err, user){
        expect(user._id).to.be.instanceof(Mongo.ObjectID);
        expect(user.baz).to.equal('bim');
        done();
      });
    });
  });
});
