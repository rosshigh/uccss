var express = require('express'),
  // debug = require('debug')('config'),
  router = express.Router(),
  mongoose = require('mongoose'),
  logger = require('../../config/logger'),
  Config = mongoose.model('Config');
//   Semester = mongoose.model('SemesterConfig'),
//   Promise = require('bluebird');

//   var requireAuth = passport.authenticate('jwt', { session: false });  

module.exports = function (app) {
  app.use('/api', router);

  router.get('/config', function(req, res, next){
    logger.log('info','Get config','verbose');
    var query = buildQuery(req.query, Config.find());
    query.exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });
}