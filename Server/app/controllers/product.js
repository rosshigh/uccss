var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  System = mongoose.model('System'),
  passport = require('passport'),
  Model = mongoose.model('Product'),
  multer = require('multer'),
  mkdirp = require('mkdirp'),
  logger = require('../../config/logger');

  var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app) {
  app.use('/', router);

  router.get('/api/products', function(req, res, next){
    logger.log("Get products","verbose");
    
    var query = buildQuery(req.query, Model.find())
    query.exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/products/:id', function(req, res, next){
    logger.log('Get product ' + req.params.id,"verbose");
    
    Model.findById(req.params.id, function(err, object){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.post('/api/products', function(req, res, next){
    logger.log('Create a product', "verbose");
    
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
    logger.log('Update Product ' + req.body._id, "verbose");

    Model.findOneAndUpdate({_id: req.body._id}, req.body, {new:true, safe:true, multi:false}, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(result);
      }
    })
  });

  router.delete('/api/products/:id', function(req, res, next){
    logger.log('Delete Product ' + req.params._id, "verbose");

    Model.findById(req.params.id, function(err, product){
      if(err){
        return next(err);
      } else {
        if(product){
          var tasks = new Array();
          if(product.systems && product.systems.length > 0){
            product.systems.forEach(item => {
              tasks.push(System.update( {_id: item.systemId}, { $pull: {productId: req.params.id } } ));
            })
          }

          Promise.all(tasks)
          .then(function(results) {
                Model.remove({ _id: req.params.id }, function(err, result){
                  if (err) {
                    return next(err);
                  } else {
                    res.status(204).json(result);
                  }
                })
          })
        }
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
