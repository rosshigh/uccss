var express = require('express'),
  debug = require('debug')('uccss'),
  router = express.Router(),
  mongoose = require('mongoose'),
  System = mongoose.model('System'),
  Model = mongoose.model('Product');

module.exports = function (app) {
  app.use('/', router);

  router.get('/api/products', function(req, res, next){
    debug('Get products');
    var query = buildQuery(req.query, Model.find())
    query.exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/products/active', function(req, res, next){
    debug('Get products');
    var fields = req.fieldList ? req.fieldList : undefined;
    Model.find({active: true})
      .sort(req.query.order)
      .select(fields)
      .exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/products/:id', function(req, res, next){
    debug('Get product [%s]', req.params.id);
    Model.findById(req.params.id, function(err, object){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.post('/api/products', function(req, res, next){
    debug('Create Product');
    var product =  new Model(req.body);
    product.save( function ( err, object ){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.put('/api/products', function(req, res, next){
    debug('Update Product [%s]', req.body._id);
    Model.findOneAndUpdate({_id: req.body._id}, req.body, {safe:true, multi:false}, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(result);
      }
    })
  });

  router.delete('/api/products/:id', function(req, res, next){
    debug('Delete product [%s]', req.params.id);
    Model.remove({ _id: req.params.id }, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(204).json(result);
      }
    })
  });
};
