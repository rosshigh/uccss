var express = require('express'),
  debug = require('debug')('config'),
  router = express.Router(),
  mongoose = require('mongoose'),
  passport = require('passport'),
  logger = require('../../config/logger'),
  Model = mongoose.model('Config'),
  Semester = mongoose.model('SemesterConfig'),
  Promise = require('bluebird');

  var requireAuth = passport.authenticate('jwt', { session: false });  

module.exports = function (app) {
  app.use('/', router);

  router.get('/api/config', function(req, res, next){
    logger.log('Get config','verbose');
    var query = buildQuery(req.query, Model.find());
    query.exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          console.log(object)
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/config/:id', requireAuth, function(req, res, next){
    logger.log('Get config for a system','verbose');
    Model.find({systemId: req.params.id})
      .exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/config/:parameter', requireAuth, function(req, res, next){
    logger.log('Get config ' + req.params.paramter,'verbose');
    Model.findOne({parameter: req.params.parameter}, function(err, object){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.post('/api/config', requireAuth, function(req, res, next){
    logger.log('Create config','verbose');
    var person =  new Model(req.body);
    person.save( function ( err, object ){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.put('/api/config', requireAuth, function(req,res,next){
    logger.log('Update parameter '+ req.body._id,'verbose');
    Model.findOneAndUpdate({_id: req.body._id}, req.body,  function(err, parameter){
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(parameter);
      }
    })
  });

  router.put('/api/config/saveAll', function(req,res,next){
    logger.log('Save all parameters','verbose');
    var tasks = new Array();
    req.body.parameters.forEach(function(item,index){
      tasks.push(Model.findOneAndUpdate({_id: item._id}, item, {safe:true, new:true}));
    });
     Promise.all(tasks)
     .then(function(results){
        res.status(200).json(results);
     })
  });

  router.put('/api/config/:parameter', requireAuth, function(req, res, next){
    logger.log('Update Clients '+ req.params.parameter,'verbose');
    Model.findOneAndUpdate({parameter: req.params.parameter}, req.body, {safe:true, multi:false}, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(result);
      }
    })
  });

  router.delete('/api/config/:parameter', requireAuth, function(req, res){
    logger.log('Delete person '+ req.params.parameter,'verbose');
    Model.remove({ parameter: req.params.parameter }, function(err, result){
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(204).json(result);
      }
    })
  });

  router.get('/api/semesterConfig', function(req, res, next){
    logger.log('Get config','verbose');
    var query = buildQuery(req.query, Semester.find());
    query.exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.put('/api/semesterConfig', function(req,res,next){
    logger.log('Save all parameters','verbose');
    var tasks = new Array();
    req.body.forEach(function(item,index){
      tasks.push(Semester.findOneAndUpdate({_id: item._id}, item, {safe:true, new:true}));
    });
     Promise.all(tasks)
     .then(function(results){
        res.status(200).json(results);
     })
  });

  router.post('/api/semesterConfig', requireAuth, function(req, res, next){
    logger.log('Create config','verbose');
    var semester =  new Semester(req.body);
    semester.save( function ( err, object ){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

};
