var express = require('express'),
  debug = require('debug')('uccss'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Message = mongoose.model('Message')
  Model = mongoose.model('Site');

module.exports = function (app) {
  app.use('/', router);

  router.get('/api/site', function(req, res, next){
    debug('Get site');
    var query = buildQuery(req.query, Model.find())
    query.exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/site/current', function(req, res, next){
    debug('Get site');
    var query = buildQuery(req.query, Model.find())
    query.exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/site/:id', function(req, res, next){
    debug('Get site [%s]', req.params.id);
    Model.findById(req.params.id, function(err, object){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.post('/api/site', function(req, res, next){
    debug('Create Site');
    var item =  new Model(req.body);
    item.save( function ( err, object ){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.put('/api/site', function(req, res, next){
    debug('Update Site [%s]', req.body._id);
    Model.findOneAndUpdate({_id: req.body._id}, req.body, {safe:true, multi:false}, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(result);
      }
    })
  });

  router.delete('/api/site/:id', function(req, res, next){
    debug('Delete site [%s]', req.params.id);
    Model.remove({ _id: req.params.id }, function(err) {
      if (err) {
        return next(err);
      }else {
        res.status(204).json({message: 'Record deleted'});
      }
    });
  });

  //Message services
  router.get('/api/messages', function(req, res, next){
    debug('Get message');
    var query = buildQuery(req.query, Message.find())
    query.exec(function(err, object){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.get('/api/messages/current', function(req, res, next){
    debug('Get message');
    var query = buildQuery(req.query, Message.find())
    query.exec(function(err, object){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.get('/api/messages/:id', function(req, res, next){
    debug('Get message [%s]', req.params.id);
    Message.findById(req.params.id, function(err, object){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.post('/api/messages', function(req, res, next){
    debug('Create message');
    var item =  new Message(req.body);
    item.save( function ( err, object ){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.put('/api/messages', function(req, res, next){
    debug('Update message [%s]', req.body._id);
    Message.findOneAndUpdate({_id: req.body._id}, req.body, {safe:true, multi:false}, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(result);
      }
    })
  });

  router.delete('/api/messages/:id', function(req, res, next){
    debug('Delete message [%s]', req.params.id);
    Message.remove({ _id: req.params.id }, function(err) {
      if (err) {
        return next(err);
      }else {
        res.status(204).json({message: 'Record deleted'});
      }
    });
  });
};
