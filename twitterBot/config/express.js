var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var glob = require('glob');


module.exports = function(app, config) {

  console.log("Starting twiiter bot application");

  app.use(express.static(config.root + '/public'));

  console.log("Loading Mongoose functionality");
  mongoose.Promise = require('bluebird');
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
  });
  mongoose.connection.once('open', function callback() {
    console.log("Mongoose connected to the database");
  });

  console.log("Attaching plugins");
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//   var secret = {
//   consumer_key: config.consumer_key,
//   consumer_secret: config.consumer_secret,
//   access_token_key: config.access_token_key,
//   access_token_secret: config.access_token_secret'
// }


  console.log("Loading models");
  var models = glob.sync(config.root + '/app/models/*.js');
    models.forEach(function (model) {
      require(model);
    });

  console.log("Loading controllers");
  var controllers = glob.sync(config.root + '/app/controllers/*.js');
    controllers.forEach(function (controller) {
      require(controller)(app, config);
  });

  // error handler for all the applications
  app.use(function (err, req, res, next) {

    var errorType = typeof err,
        code = 500,
        msg = { message: "Internal Server Error" };
        console.log(err,'error');

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
          console.log(err.inner,'error');
          console.log(err.status,'error');
            code = err.status;
            msg = err.inner;
            break;
        default:
            break;
    }

    return res.status(code).json(msg);

  });

};
