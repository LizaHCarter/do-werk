'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    session        = require('express-session'),
    RedisStore     = require('connect-redis')(session),
    debug          = require('../lib/debug'),
    security       = require('../lib/security'),
    users          = require('../controllers/users'),
    happyhours     = require('../controllers/happyhours');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../../public'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(session({store:new RedisStore(), secret:'my super secret key', resave:true, saveUninitialized:true, cookie:{maxAge:null}}));

  app.use(security.authenticate);
  app.use(debug.info);

  app.get('/home', happyhours.today);
  app.post('/register', users.register);
  app.post('/login', users.login);
  app.get('/happyhours', happyhours.index);
  app.get('/happyhours/today', happyhours.today);
  app.get('/happyhours/:id', happyhours.show);

  app.use(security.bounce);
  app.delete('/logout', users.logout);
  app.get('/profile/edit', users.edit);
  app.put('/profile', users.update);

  console.log('Express: Routes Loaded');
};

