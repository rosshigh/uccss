var passport = require('passport'),
    jwt = require('jsonwebtoken')
    User = require('../app/models/people'),
    config = require('./config'),
    jwtStrategy = require('passport-jwt').Strategy,
    extractJwt = require('passport-jwt').ExtractJwt,
    localStrategy = require('passport-local'),
    NotFoundError = require('./errors/NotFoundError'),
    UnauthorizedAccessError = require('./errors/UnauthorizedAccessError'),
    logAuth = require('./log-authenticate');

var localOptions = {
  usernameField: 'email'
};

var localLogin = new localStrategy(localOptions, function(email, password, next){
  console.log(email)
  console.log(password)
  User.findOne({email: email}, function(err,user){
    if(err){
      return next(err);
    } else {    
      if(!user){
        next(new NotFoundError("404",{ message: "Email not found."}));
      } else {
        user.comparePassword(password, function (err, isMatch) {
          if (err) {
            return next(err);
          } else if(!isMatch){
            return next(new UnauthorizedAccessError("401", {message: 'Invalid username or password'}));
          } else {
            logAuth.log('logon-' + user.email, 'info');
            return next(null, user);
          }
        });
      }
    }
  });
});

var jwtOptions = {
  jwtFromRequest: extractJwt.fromAuthHeader(),
  secretOrKey: config.secret
};

var jwtLogin = new jwtStrategy(jwtOptions, function(payload, next){
  User.findById(payload._id, function(err, user){
    if(err){
      return next(err);
    } else if (user){
      return next(null, user);
    } else {
      return next(null, false);
    }
  });
});

  generateToken = function(user){
    return jwt.sign(user, config.secret);
  };

  setUserInfo = function(req){
      return {
        _id: req._id,
        firstName: req.firstName,
        lastName: req.lastName,
        institutionId: req.institutionId,
        email: req.email
      };
  };

  login = function(req, res, next) {

    var userInfo = setUserInfo(req.user);

    res.status(200).json({
        token: generateToken(userInfo),
        user: req.user,
        temp: process.env.TEMP,
        icon: process.env.ICON
    });
  };

passport.use(jwtLogin);
passport.use(localLogin);