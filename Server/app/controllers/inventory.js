var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Model = mongoose.model('Inventory'),
    passport = require('passport'),
    logger = require('../../config/logger');

var requireAuth = passport.authenticate('jwt', { session: false });  

module.exports = function (app, config) {
  app.use('/', router);

  router.get('/api/inventory', requireAuth, function(req, res, next){
    logger.log('Get inventory','verbose');
    var query = buildQuery(req.query, Model.find())
    query.exec()
    .then(object => {
      res.status(200).json(object);
    })
    .catch(error => {
       return next(error);
    })
  });

  router.get('/api/inventory/:id', requireAuth, function(req, res, next){
    logger.log('Get help ticket '+ req.params.id, 'verbose');
    Model.findById(req.params.id)
    .exec()
      .then(object => {
        res.status(200).json(object);
      })
      .catch(error => {
        return next(error);
      })
  });

  router.post('/api/inventory', requireAuth, function(req, res, next){
    logger.log('Create inventory', "verbose");
    var inventory =  new Model(req.body);
    inventory.save( function ( err, object ){
      if (err) {
        return next(err);
      } else {          
          res.status(200).json(object);
      }
    });
  });

  router.put('/api/inventory', requireAuth, function(req, res, next){
    logger.log('Update inventory '+ req.body._id, 'verbose');

    Model.findOneAndUpdate({_id: req.body._id}, req.body, {safe:true, multi:false})
    .exec()
    .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        return next(error);
      })
  });

  router.delete('/api/inventory/:id', requireAuth, function(req, res, next){
    logger.log('Delete session ' + req.params.id, 'verbose');
    Model.removeById(req.params.id)
    .exec()
    .then(result => {
        res.status(204).json(result);
      })
      .catch(error => {
        return next(error);
      })
  });
  
}