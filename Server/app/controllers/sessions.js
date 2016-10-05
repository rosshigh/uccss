var express = require('express'),
  debug = require('debug')('sessions'),
  router = express.Router(),
  mongoose = require('mongoose'),
  passport = require('passport'),
  Model = mongoose.model('Session');

  var requireAuth = passport.authenticate('jwt', { session: false });  

module.exports = function (app) {
  app.use('/', router);

  router.get('/api/sessions', function(req, res, next){
    debug('Get sessions');
    var query = buildQuery(req.query, Model.find())
    query.exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/sessions/active', requireAuth, function(req, res, next){
    debug('Get sessions');
    Model.find( { $or:[ {'sessionStatus':'Requests'}, {'sessionStatus':'Active'}, {'sessionStatus':'Next'}]})
      .sort(req.query.order)
      .exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/sessions/:id', requireAuth, function(req, res, next){
    debug('Get session [%s]', req.params.id);
    Model.findById(req.params.id, function(err, object){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.post('/api/sessions', requireAuth, function(req, res, next){
    debug('Create Session');
    var session =  new Model(req.body);
    session.save( function ( err, object ){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.put('/api/sessions', requireAuth, function(req, res, next){
    debug('Update Session [%s]', req.body._id);
    Model.findOneAndUpdate({_id: req.body._id}, req.body, {safe:true, multi:false}, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(result);
      }
    })
  });

  router.delete('/api/sessions/:id', requireAuth, function(req, res, next){
    debug('Delete session [%s]', req.params.id);
    Model.removeById(req.params.id, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(204).json(result);
      }
    })
  });
};
