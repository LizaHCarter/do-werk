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

module.exports = happyHour;

