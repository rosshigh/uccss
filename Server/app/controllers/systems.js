var express = require('express'),
  debug = require('debug')('uccss'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Model = mongoose.model('System'),
  passport = require('passport'),
  Client = mongoose.model('Client'),
  logger = require('../../config/logger');

  var requireAuth = passport.authenticate('jwt', { session: false });  

module.exports = function (app) {
  app.use('/', router);

  router.get('/api/systems', requireAuth, function(req, res, next){
    logger.log('Get systems',"verbose");
    var query = buildQuery(req.query, Model.find())
    .populate({path: 'clients.assignments.personId', model: 'Person', select: 'firstName lastName fullName'})
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(error => {
      return next(error);
    })
  });

  router.get('/api/systems/clients', requireAuth, function(req, res, next){
    logger.log('Get systems with clients',"verbose");
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
    logger.log('Get system ' + req.params.id,"verbose");
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
    logger.log('Create system',"verbose");

    if(req.body){
      var newClients = req.body.clients;
      req.body.clients = new Array();
      var system =  new Model(req.body);
      system.save( function ( err, object ){      
        if (err) {
          console.log(err)
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
    } 
  });

  router.put('/api/systems/product', requireAuth, function(req, res, next){
    logger.log('Update systems',"verbose"); 

    if(req.body && Array.isArray(req.body)){  
      var tasks = new Array();        
      req.body.forEach(item => {  
        if(item.operation === 'add'){
           tasks.push(Model.update({_id: item.systemId}, { $push: { productId: item.productId } }));
        } else {        
           tasks.push(Model.update({_id: item.systemId}, { $pull: { productId: item.productId } }));
        }
      });
      Promise.all(tasks)
        .then(function(results) {
          res.status(200).json({msg: "systems updated"});
        })
      } else {
        res.status(404).json({msg: "No updates found"});
      }
  });

  router.put('/api/systems', requireAuth, function(req, res, next){
    logger.log('Update Systems ' + req.body._id, "verbose");
    if(req.body){
      var system = new Model();
      // system._id = req.body._id;
      // system.sid = req.body.sid;
      // system.active = req.body.active;
      // system.description = req.body.description;
      // system.server = req.body.server;
      // system.its = req.body.its;
      // system.terms = req.body.terms;
      // system.productId = req.body.productId;
      // system.idsAvailable = req.body.idsAvailable;
      // system.instance = req.body.instance;
      // system.sessions = req.body.sessions;    

      // req.body.clients.forEach(item => {
      //   var client = new Client(item);
      //   system.clients.push(client._id);
      //   Client.findOneAndUpdate({_id: client._id}, client, {upsert: true, new: true}, function(err, client){
      //     if(err) {
      //       return next(err);
      //     }
      //   })
      // })

      Model.findOneAndUpdate({_id: req.body._id}, req.body, {new:true, safe:true, multi:false}, function(err, result){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(result);
        }
      })
    }

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
