var express = require('express'),
  debug = require('debug')('uccss'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Model = mongoose.model('System'),
  passport = require('passport'),
  Client = mongoose.model('Client');

  var requireAuth = passport.authenticate('jwt', { session: false });  

module.exports = function (app) {
  app.use('/', router);

  router.get('/api/systems', requireAuth, function(req, res, next){
    debug('Get systems');
    var query = buildQuery(req.query, Model.find())
    query.populate({
      path: 'clients'
    //  ,
    //  populate: {
    //    path: 'assignments.assignment',
    //    model : 'ClientRequestDetail' }
    })
    .exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/systems/clients', requireAuth, function(req, res, next){
    debug('Get systems');
    Model.find({})
      .sort(req.query.order)
      .populate('clients')
      .exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/systems/:id', requireAuth, function(req, res, next){
    debug('Get systems [%s]', req.params.id);
    Model.findById(req.params.id)
      .populate('clients')
      .exec(function(err, object){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.post('/api/systems', requireAuth, function(req, res, next){
    debug('Create systems');
    var system =  new Model(req.body);
    system.validate(function (err) {
      if (err) {
        if(!system.productId) system.productId = null;
      }
    });
    console.log("HERE");
    system.save( function ( err, object ){      
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.put('/api/systems/product/:id', requireAuth, function(req, res, next){
    debug('Update Systems [%s]', req.params.id);
    Model.findById(req.params.id, function(err, system){
      if(err){
        return next(err);
      } else {
        if(system){
          if(req.body.productId === ""){
            system.productId = null;
          } else {
            system.productId = req.body.productId;
          }
          system.save(function(err, object){
            if(err){
              return next(err);
            } else {
              res.status(200).json(object);
            }
          });
        }
      }
    });
  });

  router.put('/api/systems', requireAuth, function(req, res, next){
    debug('Update Systems [%s]', req.body._id);

    var system = new Model();
    system._id = req.body._id;
    system.sid = req.body.sid;
    system.active = req.body.active;
    system.description = req.body.description;
    system.server = req.body.server;
    system.its = req.body.its;
    system.terms = req.body.terms;
    system.productId = req.body.productId;
    system.idsAvailable = req.body.idsAvailable;
    system.instance = req.body.instance;

    for(var i = 0, x=req.body.clients.length; i<x; i++){
      var client = new Client(req.body.clients[i]);
      system.clients.push(client._id);
      Client.findOneAndUpdate({_id: client._id}, client, {upsert: true, new: true}, function(err, client){
        if(err) {
          return next(err);
        }
      })
    }

  Model.findOneAndUpdate({_id: req.body._id}, system, {safe:true, multi:false}, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(result);
      }
    })
  }); 

  router.delete('/api/systems/:id', requireAuth, function(req, res, next){
    debug('Delete systems [%s]', req.params.id);
    Model.remove({ _id: req.params.id }, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(204).json({message: 'Record deleted'});
      }
    })
  });
};
