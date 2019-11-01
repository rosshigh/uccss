const logger = require('./logger');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const url = require('url');
const onFinished = require('on-finished');
const helmet = require('helmet');
const compression = require('compression');
const favicon = require('serve-favicon');
const fs = require('fs');

module.exports = function (app, config) {

  logger.log('info', "Starting application");

  app.use(compression({ threshold: 1 }));
  app.use(helmet())
  app.use(helmet.hsts({
    maxAge: 0,
    includeSubDomains: false
  }));

  app.use(express.static(config.root + '/public'));
  app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
  app.use(cors({ origin: "http://localhost:9000" }));

  logger.log('info', "Loading Mongoose functionality");
  mongoose.Promise = require('bluebird');
  mongoose.connect(config.db, { useMongoClient: true });
  var db = mongoose.connection;
  db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
  });
  mongoose.connection.once('open', function callback() {
    logger.log('info', "Mongoose connected to the database");
  });

  logger.log('info', "Attaching plugins");
  app.use(bodyParser.json({ limit: '1000mb' }));
  app.use(bodyParser.urlencoded({ limit: '1000mb', extended: true }));
  app.use(require('compression')());
  app.use(require('response-time')());

  logger.log('info', "Loading models");
  // var models = glob.sync(config.root + '/app/models/*.js');
  // models.forEach(function (model) {
  //   require(model);
  // });

  var models = fs.readdirSync('./app/models');
    models.forEach((model) => {
      require(config.root + '/app/models/' + model);
    });
  

  app.use(function (req, res, next) {
    onFinished(res, function (err) {
      logger.log('info', req.connection.remoteAddress + " finished request", "verbose");
    });
    next();
  });


  // require(config.root + '/app/controllers/utils.js')(app, config);   
  // require(config.root + '/app/controllers/admin.js')(app, config); 
  // require(config.root + '/app/controllers/apjClientRequests.js')(app, config); 
  // require(config.root + '/app/controllers/chapters.js')(app, config); 
  // require(config.root + '/app/controllers/config.js')(app, config); 
  // require(config.root + '/app/controllers/documents.js')(app, config); 
  // require(config.root + '/app/controllers/downloads.js')(app, config); 
  // require(config.root + '/app/controllers/email.js')(app, config); 
  // require(config.root + '/app/controllers/helpTickets.js')(app, config); 
  // require(config.root + '/app/controllers/institutions.js')(app, config); 
  // require(config.root + '/app/controllers/inventory.js')(app, config); 
  // require(config.root + '/app/controllers/is4ua.js')(app, config); 
  // require(config.root + '/app/controllers/people.js')(app, config); 
  // require(config.root + '/app/controllers/product.js')(app, config); 
  // require(config.root + '/app/controllers/sessions.js')(app, config); 
  // require(config.root + '/app/controllers/site.js')(app, config); 
  // require(config.root + '/app/controllers/social.js')(app, config); 
  // require(config.root + '/app/controllers/systems.js')(app, config); 
  // require(config.root + '/app/controllers/test.js')(app, config); 

  logger.log('info',"Loading controllers");
  var controllers = fs.readdirSync('./app/controllers');
  controllers.forEach((controller) => {
    contoller = require(config.root + '/app/controllers/' + controller)(app, config);
  });


  // logger.log('info',"Loading controllers");
  // var controllers = glob.sync(config.root + '/app/controllers/*.js');
  //   controllers.forEach(function (controller) {
  //     require(controller)(app, config);
  // });

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
        var msg = { event: 'error', code: 401, message: "Unauthorized Access-" + url_parts.pathname, error: 401, ip: req.connection.remoteAddress, err: err.stack.toString() };
        break;
      case 409:
        code = err.status;
        var msg = { event: 'error', code: 409, message: "Duplicate record found-" + url_parts.pathname, error: 409, ip: req.connection.remoteAddress, err: err.stack.toString() };
        break;
      case 404:
        code = err.status;
        var msg = { event: 'error', code: 404, message: url_parts.pathname, error: 404, ip: req.connection.remoteAddress, err: err.stack.toString() };
        break;
      default:
        code = 500;
        var msg = { event: 'error', code: 500, message: url_parts.pathname, error: 500, ip: req.connection.remoteAddress, err: err.stack.toString() };
        break;
    }
    logger.log(msg);

    return res.status(code).json(msg);

  });

};
