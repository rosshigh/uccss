'use strict'

var express = require('express'),
  debug = require('debug')('uccss'),
  fs = require('fs'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Model = mongoose.model('Document'),
  Category = mongoose.model('DocCategory'),
  passport = require('passport'),
  multer = require('multer'),
  mkdirp = require('mkdirp');

  var requireAuth = passport.authenticate('jwt', { session: false });  

module.exports = function (app, config) {
  app.use('/', router);

  router.get('/api/documents', requireAuth, function(req, res, next){
    debug('Get documents');    
    var query = buildQuery(req.query, Model.find())
    query.exec(function(err, object){
        if (err) {
        res.status(500).json(err);
        } else {
        res.status(200).json(object);
        }
    });
  });

  router.get('/api/documents/:id', requireAuth, function(req, res, next){
    debug('Get application [%s]', req.params.id);
    Model.findById(req.params.id, function(err, object){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.post('/api/documents', requireAuth, function(req, res, next){ 
    debug('Create Document');
    var document =  new Model(req.body);
    document.save( function ( err, object ){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.put('/api/documents', requireAuth, function(req, res, next){
    debug('Update Document [%s]', req.body._id);
    Model.findOneAndUpdate({_id: req.body._id}, req.body, {safe:true, multi:false}, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(result);
      }
    })
  });

  router.delete('/api/documents/:id', requireAuth, function(req, res, next){
    debug('Delete document [%s]', req.params.id);
    Model.findById(req.params.id, function(err, object){
      if (err) {
        return next(err);
      } else {
        if(object) {
          var path = config.uploads + "/documents/" + object.name; 
          Model.remove({ _id: req.params.id }, function(err) {
            if (err) {
              return next(err);
            } else {       
              deleteFolderRecursive(curPath);   
              res.status(204).json({message: 'Record deleted'});
            }
          });
        }
      }
    });
  });

  //Document Categories
  router.get('/api/documentCategory', requireAuth, function(req, res, next){
    debug('Get documentsCategory');
    Category.find({})
      .sort(req.query.order)
      .exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/documentCategory/:id', requireAuth, function(req, res, next){
    debug('Get application [%s]', req.params.id);
    Category.findById(req.params.id, function(err, object){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.post('/api/documentCategory', requireAuth, function(req, res, next){
    debug('Create Application');
    var documentsCategory =  new Category(req.body);
    documentsCategory.save( function ( err, object ){
      if (err) {
        return next(err);
      } else {
        console.log(object)
        res.status(200).json(object);
      }
    });
  });

  router.put('/api/documentCategory', requireAuth, function(req, res, next){
    debug('Update documentsCategory [%s]', req.body._id);
    Category.findOneAndUpdate({_id: req.body._id}, req.body, {safe:true, multi:false}, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(result);
      }
    })
  });

  router.delete('/api/documentCategory/:id', requireAuth, function(req, res, next){
    debug('Delete documentsCategory [%s]', req.params.id);
    Category.remove({ _id: req.params.id }, function(err) {
      if (err) {
        return next(err);
      }else {
        res.status(204).json({message: 'Record deleted'});
      }
    });
  });

  router.delete('/api/documents/file/:id/:index', requireAuth, function(req, res, next){
    Model.findById(req.params.id, function(err, document){
      if(err){
         return next(err);
      } else {
        var path = config.uploads + "/documents/" + document.categoryCode + "/" + document.name + '/' + document.files[req.params.index].fileName;     
         document.files.splice(req.params.index, 1);
         document.save(function(err, document){
            if(err){
              return next(err);
            } else {  
              fs.unlink(path, function(err){
                if(err){
                  return next(err);
                } else {
                  res.status(204).json({message: 'File deleted'});
                }
              })
            }
         })
      }
    });
  });

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let paths = req.params.container.split('$@').join('/');
      var path = config.uploads + "/documents/" + paths;
      mkdirp(path, function(err) {
        if(err){
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

  router.post('/api/documents/file/:container/:version', upload.any(), function(req, res, next){   
    res.status(200).json({message: 'file uploaded'});
  });


};

var deleteFolderRecursive = function(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index){
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