var express = require('express'),
  debug = require('debug')('uccss'),
  router = express.Router(),
  mongoose = require('mongoose'),
  System = mongoose.model('System'),
  passport = require('passport'),
  Model = mongoose.model('Product'),
  multer = require('multer'),
  mkdirp = require('mkdirp');

  var requireAuth = passport.authenticate('jwt', { session: false });

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

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      var path = config.uploads + '/productFiles/' + req.params.container;
    
      mkdirp(path, function(err) {
        if(err){
          res.status(500).json(err);
        } else {
          cb(null, path);
        }
      });
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
  });
  var upload = multer({ storage: storage });

  router.post('/api/products/upload/:id/:container', upload.any(), function(req, res, next){
      Product.findById(req.params.id, function(err, product){
        if(err){
          return next(err);
        } else {
          req.containerName = product.name;
          for(var i = 0, x = req.files.length; i<x; i++){
            var file =  {
              originalFilename: req.files[i].originalname,
              fileName: req.files[i].filename
            };
            product.files.push(file);
          }
          product.save(function(err, product) {
            if(err){
              return next(err);
            } else {
              res.status(200).json(product);
            }
          });
        }
      });
    });

};
