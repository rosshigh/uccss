var express = require('express'),
    debug = require('debug')('people'),
  	router = express.Router(),
    mongoose = require('mongoose'),
    Model = mongoose.model('Person'),
    path = require('path'),
    DuplicateRecordError = require(path.join(__dirname, "../../config", "errors", "DuplicateRecordError.js"));

module.exports = function (app) {
  app.use('/', router);

  router.get('/api/people', function(req, res){
    debug('Get people');
    var query = buildQuery(req.query, Model.find())
    query.exec(function(err, object){
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/people/institution/:id', function(req, res){
    debug('Get people');
    Model.find({})
      .sort(req.query.order)
      .where('institutionId').eq(req.params.id)
      .exec(function(err, object){
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/people/checkEmail', function(req, res){
    debug('Get person for email =' + req.params.email);
    var value = req.query.email;
    Model.find({ email : value})
      .exec(function(err, object){
        if (err) {
          res.status(500).json(err);
        } else {
          if(object.length){
            res.status(409).json({status: 'exists'});
          } else {
            res.status(200).json({status: 'available'});
          }
        }
      });
  });

  router.get('/api/people/:id', function(req, res, next){
    debug('Get person [%s]', req.params.id);
    Model.findById(req.params.id, function(err, object){
        if (err) {
         return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.post('/api/people', function(req, res){
    debug('Create Person');
    var person =  new Model(req.body);
      person.save( function ( err, object ){
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.post('/api/people/register', function(req, res, next){
    debug('Register Person');
    Model.find({ email : req.body.email}, function(err, person){
      if(err) {
        return next(err);
      } if (person.length){
        return next(new DuplicateRecordError("409"));
      } else {
        var person =  new Model(req.body);
        person.save( function ( err, object ){
          if (err) {
            res.status(500).send();
          } else {
            res.status(200).json(object);
          }
        });
      }
    })
  });

  router.put('/api/people', function(req, res){
    debug('Update Person [%s]', req.body._id);
    Model.findOneAndUpdate({_id: req.body._id}, req.body, {safe:true, multi:false}, function(err, result){
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    })
  });

  router.put('/api/people/password/:id', function(req, res){
    debug('Update Person password [%s]', req.params.id);
    Model.findById(req.params.id, function(err, result){
      if (err) {
        res.status(500).json(err);
      } else {
        result.password = req.body.password;
        result.save(function(err, person){
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(200).json(result);
          }
        });
      }
    })
  });

  router.delete('/api/people/:id', function(req, res){
    debug('Delete person [%s]', req.params.id);
    Model.remove({ _id: req.params.id }, function(err, result){
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(204).json(result);
      }
    })
  });
};
