'use strict';

var Mongo  = require('mongodb');

function happyHour(){
}

Object.defineProperty(happyHour, 'collection', {
  get: function(){return global.mongodb.collection('places');}
});

happyHour.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  happyHour.collection.findOne({_id:_id}, cb);
};

happyHour.all = function(cb){
  happyHour.collection.find().toArray(cb);
};

happyHour.findByNeighborhood = function(neighborhood, cb){
  happyHour.collection.find({neighborhood:neighborhood}).toArray(cb);
};

happyHour.findByDay = function(day, cb){
  var obj = {};
  obj[day] = {$exists: true};

  happyHour.collection.find(obj).toArray(cb);
};

happyHour.findToday = function(cb){
  var day = (new Date().getDay());

  switch(day){
    case 0:
      day = 'su';
      break;
    case 1:
      day = 'm';
      break;
    case 2:
      day = 't';
      break;
    case 3:
      day = 'w';
      break;
    case 4:
      day = 'th';
      break;
    case 5:
      day = 'f';
      break;
    case 6:
      day = 's';
  }

  var obj = {};
  obj[day] = {$exists: true};

  happyHour.collection.find(obj).toArray(cb);
};

module.exports = happyHour;
