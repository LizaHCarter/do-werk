'use strict';

var happyHour = require('../models/happyhour');

exports.index = function(req, res){
  happyHour.all(req.user, function(err, places){
    res.send({places:places});
  });
};

