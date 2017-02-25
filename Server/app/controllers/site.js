var express = require('express'),
  debug = require('debug')('uccss'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Message = mongoose.model('Message'),
  passport = require('passport'),
  multer = require('multer'),
  mkdirp = require('mkdirp'),
  logger = require('../../config/logger'),
  Model = mongoose.model('Site');

  var requireAuth = passport.authenticate('jwt', { session: false });  

module.exports = function (app) {
  app.use('/', router);

  router.get('/api/site', function(req, res, next){
    debug('Get site');
    var query = buildQuery(req.query, Model.find())
    query.exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/site/current', requireAuth, function(req, res, next){
    debug('Get site');
    var query = buildQuery(req.query, Model.find())
    query.exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/site/:id', requireAuth, function(req, res, next){
    debug('Get site [%s]', req.params.id);
    Model.findById(req.params.id, function(err, object){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.post('/api/site', requireAuth, function(req, res, next){
    logger.log('Create Site Info', 'verbose');

    var item =  new Model(req.body);
    item.save( function ( err, object ){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.put('/api/site', requireAuth, function(req, res, next){
    debug('Update Site [%s]', req.body._id);
    Model.findOneAndUpdate({_id: req.body._id}, req.body, {new: true, safe:true, multi:false}, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(result);
      }
    })
  });

  router.delete('/api/site/:id', requireAuth, function(req, res, next){
    debug('Delete site [%s]', req.params.id);
    Model.remove({ _id: req.params.id }, function(err) {
      if (err) {
        return next(err);
      }else {
        res.status(204).json({message: 'Record deleted'});
      }
    });
  });

  //Message services
  router.get('/api/messages', requireAuth, function(req, res, next){
    debug('Get message');
    var query = buildQuery(req.query, Message.find())
    query.exec(function(err, object){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.get('/api/messages/current', requireAuth, function(req, res, next){
    debug('Get message');
    var query = buildQuery(req.query, Message.find())
    query.exec(function(err, object){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.get('/api/messages/:id', requireAuth, function(req, res, next){
    debug('Get message [%s]', req.params.id);
    Message.findById(req.params.id, function(err, object){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.post('/api/messages', requireAuth, function(req, res, next){
    debug('Create message');
    var item =  new Message(req.body);
    item.save( function ( err, object ){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.put('/api/messages', requireAuth, function(req, res, next){
    debug('Update message [%s]', req.body._id);
    Message.findOneAndUpdate({_id: req.body._id}, req.body, {safe:true, multi:false}, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(result);
      }
    })
  });

  router.delete('/api/messages/:id', requireAuth, function(req, res, next){
    debug('Delete message [%s]', req.params.id);
    Message.remove({ _id: req.params.id }, function(err) {
      if (err) {
        return next(err);
      }else {
        res.status(204).json({message: 'Record deleted'});
      }
    });
  });

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      var path = config.uploads + '/site';
      
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

  router.post('/api/site/upload/:id', upload.any(), function(req, res, next){
      Model.findById(req.params.id, function(err, site){
        if(err){
          return next(err);
        } else {
          for(var i = 0, x = req.files.length; i<x; i++){
            var file =  {
              originalFilename: req.files[i].originalname,
              fileName: req.files[i].filename,
              dateUploaded: new Date()
            };
            site.file = file;
          }
          site.save(function(err, site) {
            if(err){
              return next(err);
            } else {
              res.status(200).json(site);
            }
          });
        }
      });
  });
};
