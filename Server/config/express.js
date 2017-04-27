var logger = require('./logger');
var path = require('path');
var fs = require("fs");
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var glob = require('glob');
var cors = require('cors');
var url  = require('url');
var onFinished = require('on-finished');
var NotFoundError = require(path.join(__dirname, "errors", "NotFoundError.js"));
var utils = require(path.join(__dirname, "utils.js"));
var helmet = require('helmet');
var compression = require('compression');
var favicon = require('serve-favicon');


module.exports = function(app, config) {

  logger.log("Starting application");
  app.use(compression({threshold: 1}));
  app.use(helmet())
  app.use(express.static(config.root + '/public'));
  app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
  app.use(cors());

  logger.log("Loading Mongoose functionality");
  mongoose.Promise = require('bluebird');
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
  });
  mongoose.connection.once('open', function callback() {
    logger.log("Mongoose connected to the database");
  });

  logger.log("Attaching plugins");
  app.use(bodyParser.json({limit: '1000mb'}));
  app.use(bodyParser.urlencoded({limit: '1000mb', extended: true}));
  // app.use(bodyParser.urlencoded({extended: true}));
  // app.use(bodyParser.json());
  app.use(require('compression')());
  app.use(require('response-time')());

  logger.log("Loading models");
  var models = glob.sync(config.root + '/app/models/*.js');
    models.forEach(function (model) { 
      require(model);
    });

  app.use(function (req, res, next) {
      onFinished(res, function (err) {
        logger.log(req.connection.remoteAddress + " finished request","verbose");
      });
      next();
  });

  logger.log("Loading controllers");
  var controllers = glob.sync(config.root + '/app/controllers/*.js');
    controllers.forEach(function (controller) {
      require(controller)(app, config);
  });

  // all other requests redirect to 404
  app.all("*", function (req, res, next) {
       var error = new Error('Route not found.');
        error.status = 404;
        return next(error);
  });

  // error handler for all the applications
  app.use(function (err, req, res, next) {
console.log(err.stack)        
    var url_parts = url.parse(req.url);
    switch (err.status) {
        case 401:
            code = err.status;
            var msg = {event: 'error', code: 401, message: "Unauthorized Access-" + url_parts.pathname, error: 401, ip: req.connection.remoteAddress, err: err.stack.toString()};
            break;
        case 409:
            code = err.status;
            var msg = {event: 'error', code: 409, message: "Duplicate record found-" + url_parts.pathname, error: 409, ip: req.connection.remoteAddress, err: err.stack.toString()};
            break;
        case 404:      
            code = err.status;
            var msg = {event: 'error', code: 404, message: url_parts.pathname, error: 404, ip: req.connection.remoteAddress, err: err.stack.toString()};
            break;
        default:
            code = 500;
            var msg = {event: 'error', code: 500, message: url_parts.pathname, error: 500, ip: req.connection.remoteAddress, err: err.stack.toString()};
            break;
    }
    logger.logError(msg);

    return res.status(code).json(msg);

  });

};
