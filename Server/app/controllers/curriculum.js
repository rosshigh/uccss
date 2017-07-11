var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  passport = require('passport'),
  Model = mongoose.model('Curriculum'),
  CurriculumCategory = mongoose.model('CurriculumCategory'),
  logger = require('../../config/logger'),
  multer = require('multer'),
  mkdirp = require('mkdirp');

  var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app) {
  app.use('/', router);

  router.get('/api/curriculum', function(req, res, next){
    logger.log("Get curriculum","verbose");
    
    var query = buildQuery(req.query, Model.find())
    query.exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/curriculum/:id', function(req, res, next){
    logger.log('Get curriculum ' + req.params.id,"verbose");
    
    Model.findById(req.params.id, function(err, object){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.post('/api/curriculum', function(req, res, next){
    logger.log('Create a curriculum', "verbose");
    
    var curriculum =  new Model(req.body);
    curriculum.save( function ( err, object ){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.put('/api/curriculum', function(req, res, next){
    logger.log('Update curriculum ' + req.body._id, "verbose");
	  req.body.dateModified = new Date();
    Model.findOneAndUpdate({_id: req.body._id}, req.body, {new:true, safe:true, multi:false}, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(result);
      }
    })
  });

  router.delete('/api/curriculum/:id', function(req, res, next){
    logger.log('Delete curriculum ' + req.params._id, "verbose");

	  Model.remove({ _id: req.params.id }, function(err, result){
      if (err) {
         return next(err);
      } else {
        res.status(200).json({msg: "Curriculum Deleted"});
      }
    })

  });

  //Curriculum Category routes
  router.get('/api/curriculumcategory', function(req, res, next){
    logger.log("Get curriculum category","verbose");
    
    var query = buildQuery(req.query, CurriculumCategory.find())
    query.exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/curriculumcategory/:id', function(req, res, next){
    logger.log('Get curriculum category ' + req.params.id,"verbose");
    
    CurriculumCategory.findById(req.params.id, function(err, object){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.post('/api/curriculumcategory', function(req, res, next){
    logger.log('Create a curriculum category', "verbose");
    
    var curriculum =  new CurriculumCategory(req.body);
    curriculum.save( function ( err, object ){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.put('/api/curriculumcategory', function(req, res, next){
    logger.log('Update curriculum category ' + req.body._id, "verbose");
	  req.body.dateModified = new Date();
    CurriculumCategory.findOneAndUpdate({_id: req.body._id}, req.body, {new:true, safe:true, multi:false}, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(result);
      }
    })
  });

  router.delete('/api/curriculumcategory/:id', function(req, res, next){
    logger.log('Delete curriculum category ' + req.params._id, "verbose");

	  CurriculumCategory.remove({ _id: req.params.id }, function(err, result){
      if (err) {
         return next(err);
      } else {
        res.status(200).json({msg: "Curriculum Category Deleted"});
      }
    })

  });

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {      
      var path = config.uploads + '/curriculum/' + req.params.container;
      // mkdirp(path, function(err) {
      //   if(err){
      //     res.status(500).json(err);
      //   } else {
          cb(null, path);
      //   }
      // });
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
  });

  var upload = multer({ storage: storage });

  router.post('/api/curriculum/upload/:id/:container', extendTimeout, upload.any(), function(req, res, next){
      Model.findById(req.params.id, function(err, download){
        if(err){
          return next(err);
        } else {
          for(var i = 0, x = req.files.length; i<x; i++){
            var file =  {
              originalFilename: req.files[i].originalname,
              fileName: req.files[i].filename,
              dateUploaded: new Date()
            };
            download.file = file;
          }
          download.save(function(err, download) {
            if(err){
              return next(err);
            } else {
              res.status(200).json(download);
            }
          });
        }
      });

  });

  function extendTimeout (req, res, next) {
    res.setTimeout(512000, function () { /* Handle timeout */ logger.log('Timeout', 'error') });
    next();
  }

};
