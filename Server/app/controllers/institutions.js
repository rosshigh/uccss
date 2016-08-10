var express = require('express'),
    debug = require('debug')('uccss'),
  	router = express.Router(),
    mongoose = require('mongoose'),
    Model = mongoose.model('Institution');

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

  router.get('/api/institutions/:id', function(req, res){
    Model.findById(req.params.id, function(err, object){
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.post('/api/institutions', function(req, res){
    var institution =  new Model(req.body);
    institution.save( function ( err, object ){
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.put('/api/institutions', function(req, res){
    Model.findOneAndUpdate({_id: req.body._id}, req.body, {safe:true, multi:false}, function(err, result){
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    })
  });

  router.delete('/api/institutions/:id', function(req, res, next){
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
