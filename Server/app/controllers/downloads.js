var express = require('express'),
  debug = require('debug')('uccss'),
  fs = require('fs'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Model = mongoose.model('Download'),
  AppCategory = mongoose.model('AppCategory'),
  passport = require('passport'),
  multer = require('multer'),
  mkdirp = require('mkdirp');

  var requireAuth = passport.authenticate('jwt', { session: false });  

module.exports = function (app, config) {
  app.use('/', router);

  router.get('/api/apps', requireAuth, function(req, res, next){
    debug('Get apps');
    if(req.query.helpticket && req.query.helpticket === true){
      Model.find({helpTicketRelevant: true })
        .sort(req.query.order)
        .exec(function(err, object){
          if (err) {
            return next(err);
          } else {
            res.status(200).json(object);
          }
        });
    } else {
      Model.find({})
        .sort(req.query.order)
        .exec(function (err, object) {
          if (err) {
            return next(err);
          } else {
            res.status(200).json(object);
          }
        });
    }
  });

  router.get('/api/apps/helpTickets', requireAuth, function(req, res, next){
    debug('Get apps');
    Model.find({})
      .where({ helpTicketRelevant: true })
      .sort(req.query.order)
      .exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/apps/active', requireAuth, function(req, res, next){
    debug('Get apps');
    Model.find({active: true})
      .sort(req.query.order)
      .exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/apps/:id', requireAuth, function(req, res, next){
    debug('Get application [%s]', req.params.id);
    Model.findById(req.params.id, function(err, object){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.post('/api/apps', requireAuth, function(req, res, next){
    debug('Create Application');
    var person =  new Model(req.body);
    person.save( function ( err, object ){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.put('/api/apps', requireAuth, function(req, res, next){
    debug('Update Application [%s]', req.body._id);
    Model.findOneAndUpdate({_id: req.body._id}, req.body, {safe:true, multi:false}, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(result);
      }
    })
  });

  router.delete('/api/apps/:id', requireAuth, function(req, res, next){
    debug('Delete application [%s]', req.params.id);
    Model.findById(req.params.id, function(err, object){
      if (err) {
        return next(err);
      } else {
        fs.unlink(config.uploads + '/downloads/' + object.file.originalFilename);
        Model.remove({ _id: req.params.id }, function(err) {
          if (err) {
            return next(err);
          }else {
            res.status(204).json({message: 'Record deleted'});
          }
        });
      }
    });
  });

  //Application Categories
  router.get('/api/appsCategory', requireAuth, function(req, res, next){
    debug('Get appsCategory');
    AppCategory.find({})
      .sort(req.query.order)
      .exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/appsCategory/:id', requireAuth, function(req, res, next){
    debug('Get application [%s]', req.params.id);
    AppCategory.findById(req.params.id, function(err, object){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.post('/api/appsCategory', requireAuth, function(req, res, next){
    debug('Create Application');
    var appsCategory =  new AppCategory(req.body);
    appsCategory.save( function ( err, object ){
      if (err) {
        return next(err);
      } else {
        console.log(object)
        res.status(200).json(object);
      }
    });
  });

  router.put('/api/appsCategory', requireAuth, function(req, res, next){
    debug('Update appsCategory [%s]', req.body._id);
    AppCategory.findOneAndUpdate({_id: req.body._id}, req.body, {safe:true, multi:false}, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(result);
      }
    })
  });

  router.delete('/api/appsCategory/:id', requireAuth, function(req, res, next){
    debug('Delete appsCategory [%s]', req.params.id);
    AppCategory.remove({ _id: req.params.id }, function(err) {
      if (err) {
        return next(err);
      }else {
        res.status(204).json({message: 'Record deleted'});
      }
    });
  });

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {      
      var path = config.uploads + '/downloads/' + req.params.container;
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

  router.post('/api/downloads/upload/:id/:container', upload.any(), function(req, res, next){
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
};
