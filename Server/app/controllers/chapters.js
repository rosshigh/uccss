var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  passport = require('passport'),
  Model = mongoose.model('Chapter'),
  logger = require('../../config/logger');

  var requireAuth = passport.authenticate('jwt', { session: false });  

module.exports = function (app) {
  app.use('/', router);

  router.get('/api/chapters',  function(req, res, next){
    logger.log('Get chapters',"verbose");
    
    var query = buildQuery(req.query, Model.find());
    query.exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/chapters/:id',  function(req, res, next){
    logger.log('Get chapters ' + req.params.id,"verbose");
    Model.findById(req.params.id, function(err, object){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.post('/api/chapters',  function(req, res, next){
     logger.log('Create a chapter',"verbose");

    var chapter =  new Model(req.body);
    chapter.save( function ( err, object ){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.put('/api/chapters',  function(req, res, next){
    logger.log('Update chapters ' + req.body._id,"verbose");

    Model.findOneAndUpdate({_id: req.body._id}, req.body, {new:true, safe:true, multi:false}, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(result);
      }
    })
  });

  router.delete('/api/chapters/:id',  function(req, res, next){
    logger.log('Delete chapter ' + req.body._id,"verbose");
    Model.find({_id: req.params.id}).remove().exec(function(err, object){
        if (err) {
            return next(err);
        } else {
            res.status(200).json({message: "chapter deleted"});
        }
    })
  });
};