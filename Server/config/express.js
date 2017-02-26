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


module.exports = function(app, config) {

  logger.log("Starting application");

  app.use(express.static(config.root + '/public'));

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
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
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
      next(new NotFoundError("404",{ message: "Route not found."}));
  });

  // error handler for all the applications
  app.use(function (err, req, res, next) {
        
    var url_parts = url.parse(req.url);
    switch (err.status) {
        case 401:
            code = err.status;
            var msg = {event: 'error', code: 401, message: "Unauthorized Access-" + url_parts.pathname, error: 401};
            break;
        case 409:
            code = err.status;
            var msg = {event: 'error', code: 409, message: "Duplicate record found-" + url_parts.pathname, error: 409};
            break;
        case 404:
            code = err.status;
            var msg = {event: 'error', code: 404, message: url_parts.pathname, error: 404};
            break;
        default:
            code = 500;
            var msg = {event: 'error', code: 500, message: url_parts.pathname, error: 500};
            break;
    }
    logger.logError(msg);

    return res.status(code).json(msg);

  });

};
