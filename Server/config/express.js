var logger = require('./logger');
var path = require('path');
var fs = require("fs");
// var jwt = require("express-jwt");
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var glob = require('glob');
var cors = require('cors')
var onFinished = require('on-finished');
var NotFoundError = require(path.join(__dirname, "errors", "NotFoundError.js"));
var utils = require(path.join(__dirname, "utils.js"));
// var unless = require('express-unless');


module.exports = function(app, config) {

  logger.log("Starting application");

  app.use(express.static(config.root + '/public'));

  app.use(cors());

  logger.log("Loading Mongoose functionality");
  // mongoose.set('debug', true);
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
  });
  mongoose.connection.once('open', function callback() {
    logger.log("Mongoose connected to the database");
  });

  // app.use(function(req, res, next){
  //   if(req.query.fields){
  //     var fieldArray = req.query.fields.split(",");
  //     var fieldList = '';
  //     for(var i = 0; i<fieldArray.length; i++){
  //         fieldList += fieldArray[i] + " ";
  //     }
  //     req.fieldList = fieldList.substring(0,fieldList.length-1);
  //   }
  //   next()
  // });

  logger.log("Attaching plugins");
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(require('compression')());
  app.use(require('response-time')());

  var models = glob.sync(config.root + '/app/models/*.js');
    models.forEach(function (model) {
      require(model);
    });

  // var jwtCheck = jwt({
  //     secret: config.secret
  // });
  // jwtCheck.unless = unless;

  app.use(function (req, res, next) {
      onFinished(res, function (err) {
        logger.log("[%s] finished request", req.connection.remoteAddress);
      });
      next();
  });

  // var openPaths = ['/img/*.*','/favicon.ico','/styles/styles.css','/aurelia-bootstrapper','/config.js','/api/login','/test', '/api/institutions','/api/people/register','/api/site','/api/people/checkEmail','/api/sessions'];
  // app.use(jwtCheck.unless({path:  openPaths}));
  // app.use(utils.middleware().unless({path: openPaths }));

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

    var errorType = typeof err,
        code = 500,
        msg = { message: "Internal Server Error" };
        logger.log(err,'error');

    switch (err.name) {
        case "UnauthorizedError":
            code = err.status;
            msg = undefined;
            break;
        case "DuplicateRecordError":
            code = err.status;
            msg = "Duplicate record found";
            break;
        case "BadRequestError":
        case "UnauthorizedAccessError":
        case "NotFoundError":
          logger.log(err.inner,'error');
          logger.log(err.status,'error');
            code = err.status;
            msg = err.inner;
            break;
        default:
            break;
    }

    return res.status(code).json(msg);

  });

};
