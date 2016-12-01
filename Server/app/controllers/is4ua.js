var express = require('express'),
  debug = require('debug')('is4ua'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Model = mongoose.model('is4ua'),
  multer = require('multer'),
  mkdirp = require('mkdirp'),
  Product = mongoose.model('Product'),
  Download = mongoose.model('Download'),
  passport = require('passport'),
  HelpTicket = mongoose.model('HelpTicket');

  var requireAuth = passport.authenticate('jwt', { session: false });  

module.exports = function (app, config) {
  app.use('/', router);

  router.get('/api/is4ua', function(req, res, next){
    debug('Get isua');
    Model.find({}, function(err, object){
        if (err) {
         return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.post('/api/is4ua', requireAuth, function(req, res){
    debug('Create is4ua');
    var is4ua =  new Model(req.body);
    person.save( function ( err, object ){
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.put('/api/is4ua', requireAuth, function(req, res){
    debug('Update is4ua');
    console.log(req.body)
    var is4ua = new Model(req.body);

    Model.findOneAndUpdate({_id: req.body._id}, req.body, {safe:true, multi:false}, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(result);
      }
    })

  })

};
