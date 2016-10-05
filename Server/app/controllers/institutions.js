var express = require('express'),
    debug = require('debug')('uccss'),
  	router = express.Router(),
    mongoose = require('mongoose'),
    passport = require('passport'),
    Model = mongoose.model('Institution');

  var requireAuth = passport.authenticate('jwt', { session: false });    

module.exports = function (app) {
  app.use('/', router);

  router.get('/api/institutions', function(req, res){
    var query = buildQuery(req.query, Model.find())
      query.exec(function(err, object){
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/institutions/:id', requireAuth, function(req, res){
    Model.findById(req.params.id, function(err, object){
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.post('/api/institutions', requireAuth, function(req, res){
    var institution =  new Model(req.body);
    institution.save( function ( err, object ){
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.put('/api/institutions', requireAuth, function(req, res){
    Model.findOneAndUpdate({_id: req.body._id}, req.body, {safe:true, multi:false}, function(err, result){
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    })
  });

  router.delete('/api/institutions/:id', requireAuth, function(req, res, next){
    debug('Delete institution [%s]', req.params.id);
    Model.remove({ _id: req.params.id }, function(err) {
      if (err) {
        return next(err);
      }else {
        res.status(204).json({message: 'Record deleted'});
      }
    });
  });

};
