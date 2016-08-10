"use strict";
var Mongoose = require('mongoose'),
    Counters = Mongoose.model('Counters')

var debug = require('debug')('app:routes:default' + process.pid),
    _ = require("lodash"),
    util = require('util'),
    path = require('path'),
    bcrypt = require('bcryptjs'),
    utils = require("../../config/utils.js"),
    express = require('express'),
    router = express.Router(),
    UnauthorizedAccessError = require(path.join(__dirname, "../../config", "errors", "UnauthorizedAccessError.js")),
    User = require(path.join(__dirname, "..", "models", "people.js")),
    jwt = require("express-jwt");

var authenticate = function (req, res, next) {

    debug("Processing authenticate middleware");

    var username = req.body.email,
        password = req.body.password;

    if (_.isEmpty(username) || _.isEmpty(password)) {
        return next(new UnauthorizedAccessError("401", {
            message: 'Invalid username or password'
        }));
    }

    process.nextTick(function () {

        User.findOne({
            email: username
        }, function (err, user) {
            if (err || !user) {

                return next(new UnauthorizedAccessError("401", {
                    message: 'Invalid username or password'
                }));
            }

            user.comparePassword(password, function (err, isMatch) {
                if (isMatch && !err) {
                    debug("User authenticated, generating token");
                    utils.create(user, req, res, next);
                  console.log("done generating token")
                } else {
                  console.log('passwords did not matched')
                    return next(new UnauthorizedAccessError("401", {
                        message: 'Invalid username or password'
                    }));
                }
            });
        });

    });
};

module.exports = function (app) {
    app.use('/', router);

    router.route('/test').get(function(req, res){
      return res.status(200).json(undefined);
    });

    router.route("/api/verify").get(function (req, res, next) {
        return res.status(200).json(undefined);
    });

    router.route("/api/logout").get(function (req, res, next) {
        if (utils.expire(req.headers)) {
            delete req.user;
            return res.status(200).json({
                "message": "User has been successfully logged out"
            });
        } else {
            return next(new UnauthorizedAccessError("401"));
        }
    });

    router.route("/api/login").post(authenticate, function (req, res, next) {
      debug("login");
        return res.status(200).json(req.user);
    });

    router.unless = require("express-unless");

  router.route("/api/counter/").post(function (req, res, next){
    //var counter =  Counters(req.body);

    Counters.create(req.body,function(err, result){
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    })
  });

};

debug("Loaded");
