var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  passport = require('passport'),
  Model = mongoose.model('Curriculum'),
  CurriculumCategory = mongoose.model('CurriculumCategory'),
  logger = require('../../config/logger'),
  multer = require('multer'),
  mkdirp = require('mkdirp'),
  asyncHandler = require('express-async-handler');

  var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
  app.use('/', router);

  router.get('/api/curriculum', asyncHandler(async (req, res) => {
    logger.log('info',"Get curriculum");
    
    var query = buildQuery(req.query, Model.find())
    await query.exec().then(result => {
      res.status(200).json(result);
    })
  }));

  router.get('/api/curriculum/:id', asyncHandler(async (req, res) => {
    logger.log('info','Get curriculum ' + req.params.id,"verbose");
    
    await Model.findById(req.params.id).then(result => {
      res.status(200).json(result);
    })
  }));

  router.post('/api/curriculum', asyncHandler(async (req, res) => {
    logger.log('info','Create a curriculum');
    
    var curriculum =  new Model(req.body);
    await curriculum.save().then(result => {
      res.status(200).json(result);
    })
  }));

  router.put('/api/curriculum', asyncHandler(async (req, res) => {
    logger.log('info','Update curriculum ' + req.body._id);
	  req.body.dateModified = new Date();
    await Model.findOneAndUpdate({_id: req.body._id}, req.body, {new:true, safe:true, multi:false}).then(result => {
      res.status(200).json(result);
    })
  }));

  router.delete('/api/curriculum/:id', asyncHandler(async (req, res) => {
    logger.log('info','Delete curriculum ' + req.params._id);

	  await Model.remove({ _id: req.params.id }).then(result => {
      res.status(200).json(result);
    })
  }));

  //Curriculum Category routes
  router.get('/api/curriculumcategory', asyncHandler(async (req, res) => {
    logger.log('info',"Get curriculum category","verbose");
    
    var query = buildQuery(req.query, CurriculumCategory.find())
    await query.exec().then(result => {
      res.status(200).json(result);
    })
  }));

  router.get('/api/curriculumcategory/:id', asyncHandler(async (req, res) => {
    logger.log('info','Get curriculum category ' + req.params.id,"verbose");
    
    await CurriculumCategory.findById(req.params.id).then(result => {
      res.status(200).json(result);
    })
  }));

  router.post('/api/curriculumcategory', asyncHandler(async (req, res) => {
    logger.log('info','Create a curriculum category');
    
    var curriculum =  new CurriculumCategory(req.body);
    await curriculum.save().then(result => {
      res.status(200).json(result);
    })
  }));

  router.put('/api/curriculumcategory', asyncHandler(async (req, res) => {
    logger.log('info','Update curriculum category ' + req.body._id);
	  req.body.dateModified = new Date();
    await CurriculumCategory.findOneAndUpdate({_id: req.body._id}, req.body, {new:true, safe:true, multi:false}).then(result => {
      res.status(200).json(result);
    })
  }));

  router.delete('/api/curriculumcategory/:id', asyncHandler(async (req, res) => {
    logger.log('info','Delete curriculum category ' + req.params._id);

	  await CurriculumCategory.remove({ _id: req.params.id }).then(result => {
      res.status(200).json(result);
    })
  }));

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {      
      var path = config.uploads + '/curriculum/' + req.params.container;
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

  router.post('/api/curriculum/upload/:id/:container', upload.any(), asyncHandler(async (req, res) => {
     req.socket.setTimeout(20 * 60 * 1000);
  
     await Model.findById(req.params.id).then(result => {
        for(var i = 0, x = req.files.length; i<x; i++){
          var file =  {
            originalFilename: req.files[i].originalname,
            fileName: req.files[i].filename,
            dateUploaded: new Date()
          };
          result.file = file;
        }
        result.save().then(result => {
            res.status(200).json(result);
        });
      });
  }));


  // function extendTimeout (req, res, next) {
  //    req.socket.setTimeout(10 * 60 * 1000);
  //   res.setTimeout(512000, function () { /* Handle timeout */ logger.log('info','Timeout', 'error') });
  //   next();
  // }

};
