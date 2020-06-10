var passport = require('passport'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    User = mongoose.model('Person'),
    config = require('./config'),
    jwtStrategy = require('passport-jwt').Strategy,
    extractJwt = require('passport-jwt').ExtractJwt,
    localStrategy = require('passport-local'),
    NotFoundError = require('./errors/NotFoundError'),
    UnauthorizedAccessError = require('./errors/UnauthorizedAccessError'),
    logAuth = require('./logger');

var localOptions = {
  usernameField: 'email'
};

var localLogin = new localStrategy(localOptions, function(email, password, next){
  var query = User.findOne({email: {$regex: new RegExp('^' + email.toLowerCase(), 'i')}});
  query
    .populate({ path: 'institutionId', model: 'Institution', select: 'name postalCode city institutionStatus'})
    .exec( function(err, user){
      if(err){
        return next(err);
      } else {           ;
        if(!user){
          logAuth.log('info','Wrong email logon-' + user.email);
          next(new NotFoundError("404",{ message: "Email not found."}));
        } else {       
          user.comparePassword(password, function (err, isMatch) {
            if (err) {
              logAuth.log('info','wrong password logon-' + user.email);
              return next(err);
            } else if(!isMatch){
              logAuth.log('info','Unauthorized logon-' + user.email);
              return next(new UnauthorizedAccessError("401", {message: 'Invalid username or password'}));
            } else {
              logAuth.log('info','logon-' + user.email);
              return next(null, user);
            }
          });
        }
      }
    });
});

var jwtOptions = {
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
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