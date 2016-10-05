var express = require('express'),
  debug = require('debug')('uccss'),
  router = express.Router(),
  mongoose = require('mongoose'),
  System = mongoose.model('System'),
  passport = require('passport'),
  Model = mongoose.model('Client');

  var requireAuth = passport.authenticate('jwt', { session: false });  

module.exports = function (app) {
  app.use('/', router);

  router.get('/api/clients', requireAuth, function(req, res, next){
    debug('Get clients');
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
    debug('Get clients for a system');
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
    debug('Get clients [%s]', req.params.id);
    Model.findById(req.params.id, function(err, object){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.post('/api/clients', requireAuth, function(req, res, next){
    debug('Create clients');
    var person =  new Model(req.body);
    person.save( function ( err, object ){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.put('/api/clients/multiple', requireAuth, function(req,res,next){
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
    debug('Update Clients [%s]', req.body._id);
    Model.findOneAndUpdate({_id: req.body._id}, req.body, {safe:true, multi:false}, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(result);
      }
    })
  });

  router.delete('/api/clients/system/:id', requireAuth, function(req, res, next){
    System.findById(req.params.id, function(err, system){
      if (err) {
        return next(err);
      } else {
        for(var i = 0, x=system.clients.length; i<x; i++){
          Model.remove({_id: system.clients[i]._id});
        }
        system.clients = new Array();
        system.save(function(err, result){
          res.status(204).json(result);
        });
      }
    })
  });

  router.delete('/api/clients/:id', requireAuth, function(req, res, next){
    debug('Delete clients [%s]', req.params.id);
    Model.findById(req.params.id, function(err, result){
      if(err){
        return next(err);
      } else {
        var systemId = result.systemId;
        Model.remove({_id: req.params.id}, requireAuth, function(err, result){
          if (err) {
            return next(err);
          } else {
            System.findById(systemId, function(err, system){
              if(system){
                system.clients.remove(req.params.id);
                system.save();
              }
            });
            res.status(200).json({message: "Client deleted"});
          }
        })
      }
    })

  });
};
