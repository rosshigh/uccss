'use strict'

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Model = mongoose.model('ClientRequestAPJ'),
  ClientRequestDetail = mongoose.model('ClientRequestDetailAPJ'),
  System = mongoose.model('System'),
  Assignment = mongoose.model('Assignment'),
  Person = mongoose.model('Person'),
  Package = mongoose.model('Packages'),
  Product = mongoose.model('Product'),
  passport = require('passport'),
  Promise = require('bluebird'),
  logger = require('../../config/logger'),
  EmailLog = mongoose.model('EmailLog'),
  ObjectId = require('mongodb').ObjectID;

var requireAuth = passport.authenticate('jwt', { session: false });

var ASSIGNED_REQUEST_CODE = '2';
var CUSTOMER_ACTION_REQUEST_CODE = "4";

module.exports = function (app) {
  app.use('/', router);

  router.get('/api/apj/clientRequests', requireAuth, function (req, res, next) {
    logger.log('info', 'Get clientRequests');
    var query = buildQuery(req.query, Model.find());
    query.sort(req.query.order)
      .populate({ path: 'requestDetails', model: 'ClientRequestDetailAPJ' })
      .populate({ path: 'personId', model: 'Person', select: 'firstName lastName fullName nickName phone ext mobile email institutionId file country' })
      .exec()
      .then(object => {
        if (object) {
          res.status(200).json(object);
        } else {
          res.status(200).json({ message: "No requests were found" });
        }
      })
      .catch(err => {
        return next(err);
      })
  });

  router.put('/api/apj/clientRequests/:id', requireAuth, function(req, res, next){
    logger.log('info','Update clientRequest ' + req.body._id);     
    
    var clientRequest = new Model(req.body);   

    clientRequest.requestDetails = new Array();  
    if(req.body.requestDetailsToSave){      
      var updates =req.body.requestDetailsToSave.map(detail => {     
         if(detail._id){
           if(detail.delete){
            return { 
              deleteOne: {
                  filter: {_id: detail._id}
              }
            }          
           } else {
            clientRequest.requestDetails.push(detail._id);            
            return { 
              updateOne: { 
                  "filter": { "_id": detail._id },              
                  "update": detail 
              } 
            }   
            
           }
         } else {
           var obj = new ClientRequestDetail(detail);
            obj.requestId = clientRequest._id;    
            clientRequest.requestDetails.push(obj._id);        
            return { "insertOne": { "document": obj } }

         }
       });      

      ClientRequestDetail.bulkWrite(updates, function(err, result) {
        if(err){
          return next(error);
        }     
       
        if(clientRequest.requestDetails.length === 0){
          Model.findOneAndRemove({_id: clientRequest._id}, function(err, request) {
            if(err) {
              return next(err);
            }         
            res.status(200).json(request);
          });
        } else {               
          Model.findOneAndUpdate({_id: clientRequest._id}, {$set: clientRequest}, function(err, request) {        
            if (err) {
              return next(err);
            }                               
            res.status(200).json(request);
          }); 
        }
      });
    }
  });

  router.put('/api/apj/clientRequests', requireAuth, function (req, res, next) {
    logger.log('info', 'Update clientRequest', 'verbose');

    Model.findOneAndUpdate({ _id: req.body._id }, req.body, function (err, request) {
      if (err) return next(err);
      var query = Model.find()
      query.sort(req.query.order)
        .populate({ path: 'requestDetails', model: 'ClientRequestDetailAPJ' })
        .populate({ path: 'personId', model: 'Person', select: 'firstName lastName fullName nickName phone ext mobile email institutionId file country' })
        .exec()
        .then(object => {
          if (object) {
            res.status(200).json(object);
          } else {
            res.status(200).json({ message: "No requests were found" });
          }
        })
        .catch(err => {
          return next(err);
        })
    });

  });



  router.post('/api/apj/clientRequests', requireAuth, function (req, res, next) {
    logger.log('info', 'Create clientRequest', 'verbose');

    var clientRequest = new Model(req.body);
    var tasks = new Array();

    clientRequest.requestDetails = new Array();
    req.body.requestDetails.forEach(function (detail, index) {
      var obj = new ClientRequestDetail(detail);
      obj.requestId = clientRequest._id;
      clientRequest.requestDetails.push(obj._id);
      tasks.push(ClientRequestDetail.create(obj));
    });

    Promise.all(tasks)
      .then(function (results) {
        clientRequest.save(function (err, result) {
          if (err) {
            return next(err);
          } else {
            res.status(200).json(result);
          }
        })
      })
  });

  router.get('/api/apj/clientRequestsDetails', requireAuth, function (req, res, next) {
    logger.log('info', 'Get clientRequests', 'verbose');

    var query = buildQuery(req.query, ClientRequestDetail.find());
    query
      .select('requestStatus requiredDate createdDate requestId productId assignments.systemId assignments.client')
      .populate({ path: 'requestId', model: 'ClientRequestAPJ', populate: { path: 'personId', model: 'Person', select: 'firstName lastName fullName nickName phone mobile ext email institutionId file country' } })
      .populate({ path: 'requestId', model: 'ClientRequestAPJ', populate: { path: 'institutionId', model: 'Institution', select: 'name' } })
      .populate({ path: "productId", model: "Product", select: "name" })
      .exec()
      .then(object => {
        if (object) {
          object.forEach(item => {
            if (item.requestId) item.requestId.audit = [];
          });
          res.status(200).json(object);
        } else {
          res.status(404).json({ message: "No requests were found" });
        }
      })
      .catch(err => {
        return next(err);
      })
  });

  router.get('/api/apj/clientRequestsDetails/:id', requireAuth, function (req, res, next) {
    logger.log('info', 'Get clientRequests', 'verbose');

    ClientRequestDetail.findById(req.params.id)
      .populate({ path: 'requestId', model: 'ClientRequestAPJ', populate: { path: 'personId', model: 'Person', select: 'firstName lastName fullName nickName phone mobile email institutionId file country' } })
      .populate({ path: 'requestId', model: 'ClientRequestAPJ', populate: { path: 'institutionId', model: 'Institution', select: 'name' } })
      .populate({ path: "productId", model: "Product", select: "name" })
      .exec()
      .then(object => {
        if (object) {
          res.status(200).json(object);
        } else {
          res.status(404).json({ message: "No request was found" });
        }
      })
      .catch(err => {
        return next(err);
      })
  });

  router.put('/api/apj/clientRequestsDetails', function (req, res, next) {
    logger.log('info', 'Update request detail', 'verbose');

    Model.findOneAndUpdate({ _id: req.body.requestId._id }, req.body.requestId, function (err, request) {
      if (err) return next(err);
      ClientRequestDetail.findOneAndUpdate({ _id: req.body._id }, req.body, function (err, requestDetail) {
        if (err) return next(err);
        ClientRequestDetail.findById(requestDetail._id)
          .populate({ path: 'requestId', model: 'ClientRequestAPJ', populate: { path: 'personId', model: 'Person', select: 'firstName lastName fullName nickName phone mobile email institutionId file country' } })
          .populate({ path: 'requestId', model: 'ClientRequestAPJ', populate: { path: 'institutionId', model: 'Institution', select: 'name' } })
          .populate({ path: "productId", model: "Product", select: "name" })
          .exec()
          .then(object => {
            if (object) {
              res.status(200).json(object);
            } else {
              res.status(404).json({ message: "No request was found" });
            }
          })
          .catch(err => {
            return next(err);
          })
      });
    });
  });

  router.get('/api/packages', requireAuth, function (req, res, next) {
    logger.log('info', 'Get packages');
    var query = buildQuery(req.query, Package.find());
    query.sort(req.query.order)
      .exec()
      .then(object => {
        if (object) {
          res.status(200).json(object);
        } else {
          res.status(200).json({ message: "No Packages were found" });
        }
      })
      .catch(err => {
        return next(err);
      })
  });

  router.post('/api/packages', requireAuth, function (req, res, next) {
    logger.log('info', 'Create packages', "verbose");
    var packages = new Package(req.body);
    packages.save(function (err, object) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.put('/api/packages', requireAuth, function (req, res, next) {
    logger.log('info', 'Update packages ' + req.body._id, 'verbose');

    Package.findOneAndUpdate({ _id: req.body._id }, req.body, { safe: true, multi: false })
      .exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        return next(error);
      })
  });

}