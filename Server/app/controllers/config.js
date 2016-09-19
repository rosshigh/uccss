var express = require('express'),
  debug = require('debug')('config'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Model = mongoose.model('Config');

module.exports = function (app) {
  app.use('/', router);

  router.get('/api/config', function(req, res, next){
    debug('Get config');
    var query = buildQuery(req.query, Model.find());
    query.exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/config/:id', function(req, res, next){
    debug('Get config for a system');
    Model.find({systemId: req.params.id})
      .exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/config/:parameter', function(req, res, next){
    debug('Get config [%s]', req.params.paramter);
    Model.findOne({parameter: req.params.parameter}, function(err, object){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.post('/api/config', function(req, res, next){
    debug('Create config');
    var person =  new Model(req.body);
    person.save( function ( err, object ){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });


  router.put('/api/config/:parameter', function(req, res, next){
    debug('Update Clients [%s]', req.params.parameter);
    Model.findOneAndUpdate({parameter: req.params.parameter}, req.body, {safe:true, multi:false}, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(result);
      }
    })
  });


   router.delete('/api/config/:parameter', function(req, res){
    debug('Delete person [%s]', req.params.parameter);
    Model.remove({ parameter: req.params.parameter }, function(err, result){
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(204).json(result);
      }
    })
  });
};
