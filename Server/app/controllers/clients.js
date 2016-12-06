var express = require('express'),
  debug = require('debug')('uccss'),
  router = express.Router(),
  mongoose = require('mongoose'),
  System = mongoose.model('System'),
  passport = require('passport'),
  Model = mongoose.model('Client'),
  logger = require('../../config/logger');

  var requireAuth = passport.authenticate('jwt', { session: false });  

module.exports = function (app) {
  app.use('/', router);

  router.get('/api/clients', requireAuth, function(req, res, next){
    logger.log('Get clients',"verbose");
    
    var query = buildQuery(req.query, Model.find());
    query.populate('assignments')
    query.exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/clients/system/:id', requireAuth, function(req, res, next){
    logger.log('Get clients for a system',"verbose");

    Model.find({systemId: req.params.id})
      .sort(req.query.order)
      .exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/clients/:id', requireAuth, function(req, res, next){
    logger.log('Get clients ' + req.params.id,"verbose");
    Model.findById(req.params.id, function(err, object){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.post('/api/clients', requireAuth, function(req, res, next){
     logger.log('Create a client',"verbose");

    var client =  new Model(req.body);
    client.save( function ( err, object ){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.put('/api/clients/multiple', requireAuth, function(req,res,next){
    logger.log('Modify multiple clients',"verbose");

    var clients = new Array();
    req.body.clients.forEach(function(client, index){
      if(client._id){
        clients.push(client);
      } else {
        var obj = new Model(client);
        clients.push(obj);
      }
    });

    var tasks = [];

    for (var i=0; i < clients.length; i++) {
      tasks.push(Model.findOneAndUpdate({_id: clients[i]._id}, clients[i], {safe:true, new:true, multi:false, upsert:true}));
    }

    Promise.all(tasks)
      .then(function(results) {
            res.status(200).json(results);
      })

});

  router.put('/api/clients', requireAuth, function(req, res, next){
    logger.log('Update Clients ' + req.body._id,"verbose");

    Model.findOneAndUpdate({_id: req.body._id}, req.body, {safe:true, multi:false}, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(result);
      }
    })
  });

  router.delete('/api/clients/system/:id', requireAuth, function(req, res, next){
    logger.log('Delete systems Clients ' + req.body._id,"verbose");

    System.findById(req.params.id, function(err, system){
      if (err) {
        return next(err);
      } else {
        if(system){
          Model.find({systemId: req.params.id}).remove().exec();
          system.clients = new Array();
          system.save(function(err, result){
            res.status(204).json(result);
          });
        }
      }
    })
  });

  router.delete('/api/clients/:id', requireAuth, function(req, res, next){
     logger.log('Delete Client ' + req.body._id,"verbose");
    Model.findById(req.params.id, function(err, result){
      if(err){
        return next(err);
      } else {
        if(result){
          var systemId = result.systemId;
          Model.find({_id: req.params.id}).remove().exec(function(err, object){
            if (err) {
              return next(err);
            } else {
              System.findById(systemId, function(err, system){
                if(system){
                  system.clients.pull({ _id: req.params.id });
                  system.save();
                }
              });
              res.status(200).json({message: "Client deleted"});
            }
          })
        } else {
          res.status(404).json({message: "Client not found"});
        }

      }
    })

  });
};
