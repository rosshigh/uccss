var express = require('express'),
  debug = require('debug')('uccss'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Model = mongoose.model('ClientRequest'),
  ClientRequestDetail = mongoose.model('ClientRequestDetail'),
  Assignment = mongoose.model('Assignment'),
  Course = mongoose.model('Course'),
  Promise = require('bluebird');

module.exports = function (app) {
  app.use('/', router);

  router.get('/api/clientRequests', function(req, res, next){
    debug('Get clientRequests');
    var query = buildQuery(req.query, Model.find());
    query.sort(req.query.order)
      .populate('requestDetails')
      .exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/clientRequests/person/:id', function(req, res, next){
    debug('Get clientRequests');
    Model.find({personId: req.params.id})
      .sort(req.query.order)
      .exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/clientRequests/person/:id/session/:sessionId', function(req, res, next){
    debug('Get clientRequests');
    Model.find({personId: req.params.id, sessionId: req.params.sessionId})
      .sort(req.query.order)
      .populate('requestDetails')
      .exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/clientRequests/person/:personId/session/:sessionId/course/:courseId', function(req, res, next){
    debug('Get clientRequests');
    Model.find({personId: req.params.personId, sessionId: req.params.sessionId, courseId: req.params.courseId })
      .sort(req.query.order)
      .populate('requestDetails')
      .exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/clientRequests/active', function(req, res, next){
    debug('Get clientRequests');
    Model.find({active: true})
      .sort(req.query.order)
      .exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/clientRequests/:id', function(req, res, next){
    debug('Get clientRequest [%s]', req.params.id);
    Model.findById(req.params.id, function(err, object){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.get('/api/clientRequests/current/count', function(req, res, next){
    debug('Get helpTicket');
    var query = buildQuery(req.query, ClientRequestDetail.find({ $or:[ {'requestStatus':1}, {'requestStatus':3}, {'requestStatus':4} ]}))
    //query.exec(function(err, object){
    //ClientRequestDetail.find( { $or:[ {'requestStatus':1}, {'requestStatus':3}, {'requestStatus':4} ]})
      query.sort(req.query.order)
      .exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.post('/api/clientRequests', function(req, res, next){
    debug('Create clientRequest');
    var clientRequest = new Model(req.body);
    var details = new Array();
    req.body.requestDetails.forEach(function(detail, index){
      var obj = new ClientRequestDetail(detail);
      obj.requestId = clientRequest._id;
      details.push(obj);
    });

    var tasks = new Array;

    for (var i=0; i < details.length; i++) {
      tasks.push(ClientRequestDetail.create(details[i]));
    }

    Promise.all(tasks)
      .then(function(results) {
        console.log(results)
        clientRequest.requestDetails = new Array();
        results.forEach(function (record) {
          clientRequest.requestDetails.push(record._id);
        });
        clientRequest.save(function (err, result) {
          if (err) {
            return next(err);
          } else {
            res.status(200).json(result);
          }
        });
      });
  });

  router.put('/api/clientRequests', function(req, res, next){
    debug('Update clientRequest [%s]', req.body._id);
    var clientRequest = new Model(req.body);
    var details = new Array();
    var tasks = new Array();
    req.body.requestDetailsToSave.forEach(function(detail, index){
      var obj = new ClientRequestDetail(detail);
      details.push(obj._id)
      if(detail._id){
        tasks.push(ClientRequestDetail.findOneAndUpdate({_id: detail._id}, detail, {safe:true, new:true, multi:false, upsert:true }));
      } else {
        var obj = new ClientRequestDetail(detail);
        clientRequest.requestDetails.push(obj._id);
        obj.requestId = clientRequest._id;
        tasks.push(ClientRequestDetail.create(obj));
      }
    });

    Promise.all(tasks)
      .then(function(results) {
        Model.findOneAndUpdate({_id: clientRequest._id}, {$set:clientRequest}, {safe:true, new:true, multi:false}, function(err, result){
          if(err) {
            return next(err);
          } else {
            res.status(200).json(result);
          }
        });
      }, function (err) {
        return next(err);
      })

  });

  router.put('/api/clientRequests/customerAction', function(req, res, next){
    if(req.body.customerMessage){
      ClientRequestDetail.findById(req.body.id, function(err, request){
        request.customerMessage = req.body.customerMessage;
        request.requestStatus = req.body.requestStatus;
        if(req.body.audit) request.audit.push(req.body.audit);
        request.save(function(err, request){
          if(err) {
            return next(err);
          } else {
            var obj = {
              subject: 'Customer action required',
              email: req.body.toEmail,
              template: 'client-request-customer-action',
              context: {
                requestNo: request.requestNo,
                product: req.body.product,
                session: req.body.session,
                customerMessage: req.body.customerMessage
              }
            };
            sendMail(obj);
            res.status(200).json(request);
          }
        })
      })
    }
  });

  router.delete('/api/clientRequests/:id', function(req, res, next){
    debug('Delete clientRequest [%s]', req.params.id);
    Model.remove(req.params.id, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(204).json(result);
      }
    })
  });

  router.post('/api/clientRequestDetails', function(req, res, next){
    debug('Create clientRequestDeails');
    var clientRequestDetail =  new ClientRequestDetail(req.body);
    clientRequestDetail.save( function ( err, object ){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.get('/api/clientRequestsDetails', function(req, res, next){
    debug('Get clientRequests');
    var query = buildQuery(req.query, ClientRequestDetail.find());
    query.populate('requestId')
    query.exec(function(err, object){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.get('/api.clientRequestsDetails/count',function(req, res, next){
    debug('Get clientRequests');
    var query = buildQuery(req.query, ClientRequestDetail.find());
    query.exec(function(err, object){
      if (err) {
        return next(err);
      } else {
        res.status(200).json({count: object.length});
      }
    });
  });

  router.put('/api/clientRequestsDetails', function(req, res, next){
    debug('Get clientRequests');
    var clientRequest = new Model(req.body.requestId);

    Model.findOneAndUpdate({_id: req.body.requestId._id}, req.body, {safe:true, multi:false}, function(err, result){
      if (err) {
        return next(err);
      } else {

        res.status(200).json(result);
      }
    })

  });

  //Courses Routes
  router.get('/api/courses', function(req, res, next){
    debug('Get courses');
    var query = buildQuery(req.query, Course.find());
    query.populate('requestDetails');
    query.exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/courses/person/:id', function(req, res, next){
    debug('Get courses');
    Course.find({personId: req.params.id})
      .sort(req.query.order)
      .exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/courses/active', function(req, res, next){
    debug('Get courses');
    Course.find({active: true})
      .sort(req.query.order)
      .exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/courses/:id', function(req, res, next){
    debug('Get courses [%s]', req.params.id);
    Course.findById(req.params.id, function(err, object){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.post('/api/courses', function(req, res, next){
    debug('Create courses');
    var clientRequest =  new Course(req.body);
    clientRequest.save( function ( err, object ){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.put('/api/courses', function(req, res, next){
    debug('Update courses [%s]', req.body._id);
    Course.findOneAndUpdate({_id: req.body._id}, req.body, {safe:true, multi:false}, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(result);
      }
    })
  });

  router.delete('/api/courses/:id', function(req, res, next){
    debug('Delete courses [%s]', req.params.id);
    Course.remove(req.params.id, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(204).json(result);
      }
    })
  });
};
