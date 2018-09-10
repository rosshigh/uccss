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

  // router.get('/api/systems/clients', requireAuth, function(req, res, next){
  //   logger.log('Get systems with clients',"verbose");
  //   Model.find({})
  //     .sort(req.query.order)
  //     .populate({path: 'clients.assignments.personId', model: 'Person', select: 'firstName lastName fullName'})
  //     .exec(function(err, object){
  //       if (err) {
  //         return next(err);
  //       } else {
  //         res.status(200).json(object);
  //       }
  //     });
  // });

  router.get('/api/systems/product/:systems', requireAuth, function(req, res, next){
    logger.log('Getting product systems');
    var productSystems = req.params.systems.split(':');
    Model.find({sid: { $in: productSystems}})
      .populate({path: 'clients.assignments.assignment', model: 'ClientRequestDetail'}) //, select: 'requestId _id studentIDRange'
      .populate({path: 'clients.assignments.personId', model: 'Person', select: 'firstName lastName fullName'})
      .exec(function(err, systems){
      if(err){
        return next(err);
      } else {
        res.status(200).json(systems)
      }
    });
  });

  router.get('/api/systems/:id', requireAuth, function(req, res, next){
    logger.log('Get system ' + req.params.id,"verbose");
    Model.findById(req.params.id)
     .populate({path: 'clients.assignments.personId', model: 'Person', select: 'firstName lastName fullName'})
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

      Model.findOneAndUpdate({_id: req.body._id}, req.body, {new:true, safe:true, multi:false}, function(err, result){
        if (err) {
          return next(err);
        } else {
          Model.findById(req.body._id)
            .populate({path: 'clients.assignments.personId', model: 'Person', select: 'firstName lastName fullName'})
            .exec()
            .then(result => {
              res.status(200).json(result)
            })
            .catch(error => {
              return next(error);
            })
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
