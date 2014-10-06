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
      day = 'sunday';
      break;
    case 1:
      day = 'monday';
      break;
    case 2:
      day = 'tuesday';
      break;
    case 3:
      day = 'wednesday';
      break;
    case 4:
      day = 'thursday';
      break;
    case 5:
      day = 'friday';
      break;
    case 6:
      day = 'saturday';
  }
  happyHour.findByDay(day, cb);
};

module.exports = happyHour;
