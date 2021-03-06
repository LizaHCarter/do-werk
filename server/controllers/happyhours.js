'use strict';

var happyHour = require('../models/happyhour');

exports.index = function(req, res){
  happyHour.all(function(err, happyhours){
    res.send({happyhours:happyhours});
  });
};

exports.today = function(req, res){
  happyHour.findToday(function(err, happyhours){
    res.send({happyhours:happyhours});
  });
};

exports.show = function(req, res){
  happyHour.findById(req.params.id, function(err, happyhour){
    res.send({happyhour:happyhour});
  });
};
