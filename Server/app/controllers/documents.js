'use strict'

var express = require('express'),
  logger = require('../../config/logger'),
  fs = require('fs'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Model = mongoose.model('Document'),
  Category = mongoose.model('DocCategory'),
  passport = require('passport'),
  multer = require('multer'),
  mkdirp = require('mkdirp'),
  asyncHandler = require('express-async-handler');

var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
  app.use('/', router);

  router.get('/api/documents', requireAuth, asyncHandler(async (req, res) => {
    logger.log('info', 'Get documents');
    var query = buildQuery(req.query, Model.find())
    await query.exec().then(result => {
      res.status(200).json(result);
    })
  }));

  router.get('/api/documents/:id', requireAuth, asyncHandler(async (req, res) => {
    logger.log('info', 'Get application [%s]', req.params.id);
    await Model.findById(req.params.id).then(result => {
      res.status(200).json(result);
    })
  }));

  router.post('/api/documents', requireAuth, asyncHandler(async (req, res) => {
    logger.log('info', 'Create Document');
    var document = new Model(req.body);
    await document.save().then(result => {
      res.status(200).json(result);
    })
  }));

  router.put('/api/documents', requireAuth, asyncHandler(async (req, res) => {
    logger.log('info', 'Update Document [%s]', req.body._id);
    await Model.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true, safe: true, multi: false }).then(result => {
      res.status(200).json(result);
    })
  }));

  router.delete('/api/documents/:id', requireAuth, asyncHandler(async (req, res) => {
    logger.log('info', 'Delete document [%s]', req.params.id);
    await Model.findById(req.params.id).then(result => {
      if (result) {
        var path = config.uploads + "/documents/" + result.name;
        Model.remove({ _id: req.params.id }, function (err) {
          if (err) {
            return next(err);
          } else {
            deleteFolderRecursive(path);
            res.status(204).json({ message: 'Record deleted' });
          }
        });
      }
    })
  }));

  //Document Categories
  router.get('/api/documentCategory', requireAuth, asyncHandler(async (req, res) => {
    logger.log('info', 'Get documentsCategory');
    await Category.find()
      .sort(req.query.order)
      .exec().then(result => {
        res.status(200).json(result);
      });
  }));

  router.get('/api/documentCategory/:id', requireAuth, asyncHandler(async (req, res) => {
    logger.log('info', 'Get application [%s]', req.params.id);
    await Category.findById(req.params.id).then(result => {
      res.status(200).json(result);
    });
  }));

  router.post('/api/documentCategory', requireAuth, asyncHandler(async (req, res) => {
    logger.log('info', 'Create Application');
    var documentsCategory = new Category(req.body);
    await documentsCategory.save().then(result => {
      res.status(200).json(result);
    });
  }));

  router.put('/api/documentCategory', requireAuth, asyncHandler(async (req, res) => {
    logger.log('info', 'Update documentsCategory [%s]', req.body._id);
    Category.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true, safe: true, multi: false }).then(result => {
      res.status(200).json(result);
    });
  }));

  router.delete('/api/documentCategory/:id', requireAuth, asyncHandler(async (req, res) => {
    logger.log('info', 'Delete documentsCategory [%s]', req.params.id);
    Category.remove({ _id: req.params.id }).then(result => {
      res.status(200).json(result);
    });
  }));

  router.delete('/api/documents/file/:id/:index', requireAuth, asyncHandler(async (req, res) => {
    await Model.findById(req.params.id).then(result => {
      var path = config.uploads + "/documents/" + result.categoryCode + "/" + result.name + '/' + result.files[req.params.index].fileName;
      result.files.splice(req.params.index, 1);
      result.save(function(err, document){
        if(err){
          return next(err);
        } else {  
          fs.unlink(path, function (err) {
            if (err) {
              return next(err);
            } else {
              res.status(204).json({ message: 'File deleted' });
            }
          })
        }
      });
    })
  }));

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let paths = req.params.container.split('$@').join('/');
      var path = config.uploads + "/documents/" + paths;
      mkdirp(path, function (err) {
        if (err) {
          res.status(500).json(err);
        } else {
          cb(null, path);
        }
      });
    },
    filename: function (req, file, cb) {
      let fileName = file.originalname.split('.');
      cb(null, fileName[0] + " (" + req.params.version + ")." + fileName[fileName.length - 1]);
    }
  });

  var upload = multer({ storage: storage });

  router.post('/api/documents/file/:container/:version', upload.any(), function (req, res, next) {
    res.status(200).json({ message: 'file uploaded' });
  });


};

var deleteFolderRecursive = function (path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file, index) {
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};