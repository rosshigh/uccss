'use strict'

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Model = mongoose.model('ClientRequest'),
  ClientRequestDetail = mongoose.model('ClientRequestDetail'),
  Assignment = mongoose.model('Assignment'),
  Course = mongoose.model('Course'),
  Person = mongoose.model('Person'),
  Product = mongoose.model('Product'),
  passport = require('passport'),
  Promise = require('bluebird'),
  ClientRequestLock = mongoose.model('ClientRequestLock'),
  logger = require('../../config/logger'),
  ObjectId = require('mongodb').ObjectID;;

  var requireAuth = passport.authenticate('jwt', { session: false });  

  var ASSIGNED_REQUEST_CODE = '2';
  var CUSTOMER_ACTION_REQUEST_CODE = "4";

module.exports = function (app) {
  app.use('/', router);

  router.get('/api/clientRequests', requireAuth, function(req, res, next){
    logger.log('Get clientRequests');
    var query = buildQuery(req.query, Model.find());
    query.sort(req.query.order)
      .populate('requestDetails')
      .exec()
      .then(object => {
        if(object){
          res.status(200).json(object);
        } else {
          res.status(404).json({message: "No requests were found"});
        }
      })
      .catch(err => {
          return next(err);
      })
  });

  router.get('/api/clientRequests/current/count', requireAuth, function(req, res, next){
    logger.log('Get helpTicket');
    var query = buildQuery(req.query, ClientRequestDetail.find({ $or:[ {'requestStatus':1}, {'requestStatus':3}, {'requestStatus':4} ]}))
      query.sort(req.query.order)
      .exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          if(object){
            res.status(200).json(object);
          } else {
            res.status(404).json({message: "No requests were found"});
          }
        }
      });
  });

  router.get('/api/clientRequests/:id/:sessions', requireAuth, function(req, res, next){
    logger.log('Get customers active clientRequests');
     var activeSessions = req.params.sessions.split(":");
     for(let i = 0; i < activeSessions.length; i++){
       activeSessions[i] = ObjectId(activeSessions[i]);
     }
    Model.find()
      .where('personId').eq(req.params.id)
      .where('sessionId').in(activeSessions)
      .sort(req.query.order)
      .populate('requestDetails')
      .exec()
      .then(object => {      
        if(object){
          res.status(200).json(object);
        } else {
          res.status(404).json({message: "No requests were found"});
        }
      })
      .catch(err => {
          return next(err);
      })
      
  });

  router.get('/api/clientRequests/:id', requireAuth, function(req, res, next){
    logger.log('Get clientRequest' + req.params.id, 'verbose');
    Model.findById(req.params.id, function(err, object){
      if (err) {
        return next(err);
      } else {
        if(object){
          res.status(200).json(object);
        } else {
          res.status(404).json({message: "No requests were found"});
        }
      }
    });
  });

  router.post('/api/clientRequests', requireAuth, function(req, res, next){
    logger.log('Create clientRequest','verbose');  
    var clientRequest = new Model(req.body);
    var tasks = new Array();
    var products = new Array();    

    clientRequest.requestDetails = new Array();
    req.body.requestDetails.forEach(function(detail, index){
      var obj = new ClientRequestDetail(detail);
      obj.requestId = clientRequest._id;
      clientRequest.requestDetails.push(obj._id);
      tasks.push(ClientRequestDetail.create(obj));
      var date = new Date(detail.requiredDate);
      var day = date.getDate();
      var month = date.getMonth();
      var year = date.getFullYear();
      products.push({id: detail.productId, requiredDate: month + "/" + day + "/" + year, name: detail.productName})    
    });

    Promise.all(tasks)
      .then(function(results) {     
        clientRequest.save(function (err, result) {        
          if (err) {
            return next(err);
          } else {          
            if(req.query.email == 1){            
              Person.findById(clientRequest.personId, function(err, person){
                if(err){
                  return next(err);
                } else {   
                  if(person){                                          
                    var context = {
                      products: products,
                      numStudents: parseInt(clientRequest.undergradIds) + parseInt(clientRequest.graduateIds),
                      requestNo: clientRequest.clientRequestNo,
                      comments: clientRequest.comments
                    }                   
                    var mailObj = {
                      email: person.email,
                      context: context
                    }                   
                    requestCreated(mailObj) 
                  }                       
                  res.status(200).json({message: "request created"});
                }
              })
            } else {
              res.status(200).json({message: "request created"});
            }
          }
        }) 
      })
  });

  router.put('/api/clientRequests/assign', requireAuth, function(req, res, next){
    logger.log('Assign clientRequest ' + req.body._id);          
    let clientRequest = new Model(req.body);     
    let tasks = new Array();   
    if(req.body.requestDetailsToSave){
       req.body.requestDetailsToSave.forEach((detail, index) => {               
            tasks.push(ClientRequestDetail.findOneAndUpdate({_id: detail._id}, detail, {safe:true, new:true, multi:false, upsert:true }));
       });
    }      
 
    Promise.all(tasks)
        .then(request => {      
          Model.findOneAndUpdate({_id: clientRequest._id}, {$set:clientRequest}, {safe:true, new:true, multi:false}, function(error, request){
                if(error){
                  return next(error);
                } else { 
                  if(req.query.email == 1 && request._id){
                    var query = Model.findOne({_id: request._id}).populate('requestDetails').exec()                   
                      .then(requestResult => {  
                        Person.findById(requestResult.personId, function(error, person){
                          if(error){
                            return next(error);
                          } else {
                            if(person){
                              var mailObj = {
                                email: person.email,
                                context: request
                              }                    
                              requestUpdated(mailObj) 
                            }
                            res.status(200).json(requestResult);                                
                          }           
                        })
                      })
                      .catch(error => { //Promise
                        return next(error);
                      }) 
                  } else {
                    res.status(200).json(request);
                  }
                }
          })
        })
        .catch(error => { //Promise        
            return next(error);
        }) 
  });

  router.put('/api/clientRequests', requireAuth, function(req, res, next){
    logger.log('Update clientRequest ' + req.body._id);       
    let clientRequest = new Model(req.body); 
    clientRequest.requestDetails = new Array();    
    let tasks = new Array();     
    if(req.body.requestDetailsToSave){
       req.body.requestDetailsToSave.forEach((detail, index) => {
         if(detail._id){
           if(detail.delete){        
               tasks.push(ClientRequestDetail.remove({ _id: detail._id }));
               clientRequest.requestDetails.splice(clientRequest.requestDetails.indexOf(detail._id), 1);
           } else {
              tasks.push(ClientRequestDetail.findOneAndUpdate({_id: detail._id}, detail, {safe:true, new:true, multi:false, upsert:true }));
              clientRequest.requestDetails.push(detail._id);   
           }
         } else {
            let obj = new ClientRequestDetail(detail);
            clientRequest.requestDetails.push(obj._id);               
            obj.requestId = clientRequest._id;
            tasks.push(ClientRequestDetail.create(obj));           
         }
       });
    }        
    Promise.all(tasks)
        .then(results => {            
          if(clientRequest.requestDetails.length > 0){           
            updateRequest(clientRequest, req, res, next);
          } else {          
            deleteRequest(clientRequest, req, res, next);
          }
        })
        .catch(error => { //Promise        
            return next(error);
        }) 
  });

  router.put('/api/clientRequests/customerAction', requireAuth, function(req, res, next){
    if(req.body.customerMessage){    
      if(req.body.model === 'header'){
        Model.findById(req.body.id, function(err, request){   
          if(request){  
            request.customerMessage = req.body.customerMessage;
            request.requestStatus = req.body.requestStatus;
            request.requestDetails.forEach(item => {   
              ClientRequestDetail.findById(item).exec()
                .then(detail => {                
                  if(detail.requestStatus != ASSIGNED_REQUEST_CODE) {
                    detail.requestStatus = CUSTOMER_ACTION_REQUEST_CODE;                          
                    detail.save();
                  }
                })
            })
            if(req.body.audit) request.audit.push(req.body.audit);
            request.save(function(err, request){
              if(err) {
                return next(err);
              } else {
                var obj = {
                  email: req.body.toEmail,
                  subject: req.body.subject,
                  context: {
                    requestNo: req.body.clientRequestNo,
                    course: req.body.course,
                    session: req.body.session,
                    customerMessage: req.body.customerMessage
                  }
                };
                customerAction(obj)
                res.status(200).json(request);
              }
            })
          } else {
              var error = new Error('No request found');
              error.status = 404;
              return next(error);
          }   
        })
      } else {
          ClientRequestDetail.findById(req.body.id, function(err, request){  
            if(request){
                request.customerMessage = req.body.customerMessage;     
                request.requestStatus = req.body.requestStatus;          
                if(req.body.audit) request.audit.push(req.body.audit);
                request.save(function(err, request){
                  if(err) {
                    return next(err);
                  } else {
                    var obj = {
                      email: req.body.toEmail,
                      subject: req.body.subject,
                      context: {
                        requestNo: req.body.clientRequestNo,
                        product: req.body.product,
                        course: req.body.course,
                        session: req.body.session,
                        customerMessage: req.body.customerMessage
                      }
                    };
                    customerAction(obj)
                    res.status(200).json(request);
                  }
                })
              } else {
                  var error = new Error('No request found');
                  error.status = 404;
                  return next(error);
              }    
            })     
      }
    } else {
      res.status(404).json({message: "No Message"});
    }
  });

  router.delete('/api/clientRequests/:id', requireAuth, function(req, res, next){
    logger.log('Delete clientRequest [%s]', req.params.id);
    Model.remove(req.params.id, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(204).json(result);
      }
    })
  });

  router.get('/api/clientRequestsDetails', requireAuth, function(req, res, next){
    logger.log('Get clientRequests', 'verbose');
    var query = buildQuery(req.query, ClientRequestDetail.find());
    query.populate('requestId')
    query.exec()
      .then(object => {
        if(object){
          res.status(200).json(object);
        } else {
          res.status(404).json({message: "No requests were found"});
        }
      })
      .catch(err => {
        return next(err);
      })
  });

  router.get('/api/clientRequestsDetails/:id', requireAuth, function(req, res, next){
    logger.log('Get clientRequests', 'verbose');
    ClientRequestDetail.findById(req.params.id)
      .populate('requestId')
      .exec()
      .then(object => {
        if(object){
          res.status(200).json(object);
        } else {
          res.status(404).json({message: "No request was found"});
        }
      })
      .catch(err => {
        return next(err);
      })
  });

  router.get('/api/clientRequestsDetails/:sessionId/:institutionId', requireAuth, function(req, res, next){
    logger.log('Get clientRequests', 'verbose');   
    ClientRequestDetail.find()
    .populate('requestId')
    .exec()
    .then(results => {   
       if(results){
          var resultArray = results.filter(item => {        
            return item.requestId.sessionId == req.params.sessionId && item.requestId.institutionId == req.params.institutionId;
          }) 
          res.status(200).json(resultArray);
        } else {
          res.status(404).json({message: "No requests were found"});
        } 
      })
      .catch(err => {
        return next(err);
      })
  });

  router.delete('/api/clientRequestsDetails/:id/:requestid', requireAuth, function(req, res, next){
    logger.log('Delete clientRequestsDetails ', req.params.id);

    Model.findById(req.params.requestid, function(err, request) {
      if(err){
        return next(err);
      } else {
        if(request){
          if(request.requestDetails && request.requestDetails.length > 0){      
            request.requestDetails.splice(request.requestDetails.indexOf(req.params.id),1); 
            if(request.requestDetails.length === 0) {
              Model.remove(req.params.requestid);
            } else {
              request.save();
            }
          }
        }
      }
    })

    ClientRequestDetail.findByIdAndRemove(req.params.id, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(204).json({message: "Request deleted"});
      }
    })
  });

  //Courses Routes
  router.get('/api/courses', requireAuth, function(req, res, next){
    logger.log('Get courses', 'verbose');
    var query = buildQuery(req.query, Course.find());
    query.exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          if(object){
            res.status(200).json(object);
          } else {
            res.status(404).json({message: "No courses were found"});
          }
        }
      });
  });

  router.get('/api/courses/person/:id', requireAuth, function(req, res, next){
    logger.log('Get courses', 'verbose');
    Course.find({personId: req.params.id})
      .sort(req.query.order)
      .exec(function(err, object){
        if (err) {
          return next(err);
        } else {
        if(object){
          res.status(200).json(object);
        } else {
          res.status(404).json({message: "No courses was found"});
        }
        }
      });
  });

  router.post('/api/courses', requireAuth, function(req, res, next){
    logger.log('Create courses');
    var clientRequest =  new Course(req.body);
    clientRequest.save( function ( err, object ){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.put('/api/courses', requireAuth, function(req, res, next){
    logger.log('Update courses ' + req.body._id, "verbose");
    Course.findOneAndUpdate({_id: req.body._id}, req.body, {safe:true, multi:false}, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(result);
      }
    })
  });

  router.delete('/api/courses/:id', requireAuth, function(req, res, next){
    ogger.log('Delete courses ' + req.params.id, "verbose");
    Course.remove(req.params.id, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(204).json(result);
      }
    })
  });

  router.get('/api/clientRequestLocks', function(req, res, next){
      logger.log('Get clientRequest Locks','verbose');
      ClientRequestLock.find()
        .sort("-createdAt")
        .exec()
        .then(function(locks){
          res.status(200).json(locks);
        })
        .catch(function(err){
          return next(err);
			  })

  });

  router.get('/api/clientRequestLocks/:id',  function(req, res, next){
      logger.log('Get clientRequest Locks' + req.params.id,'verbose');
      ClientRequestLock.find({requestId: req.params.id})
        .sort("-createdAt")
        .exec()
        .then(function(locks){         
          if(locks.length === 0){
            res.status(200).json({requestId: 0});
          } else {
            res.status(200).json(locks);
          }
        })
        .catch(function(err){
          return next(err);
			})

  });

  router.post('/api/clientRequestLocks',  function(req, res, next){
     logger.log('Create clientRequest Lock', 'verbose');
      var clientRequestLock =  new ClientRequestLock(req.body);
      clientRequestLock.save()
				.then(function (result) {
					res.status(201).json(result);
				})
				.catch(function (err) {
					return next(err);
				});
  });

  router.delete('/api/clientRequestLocks/:id',  function(req, res, next){
      logger.log('Delete Help Ticket Lock ' + req.params.id, 'verbose');
			var query = ClientRequestLock.remove({ requestId: req.params.id })
				.exec()
				.then(function (result) {
					res.status(200).json({"message" : "Lock removed"});
				})
				.catch(function (err) {
					return next(err);
				});

  });
};

  function updateRequest(clientRequest, req, res, next){


      Model.findOneAndUpdate({_id: clientRequest._id}, {$set:clientRequest}, {safe:true, new:true, multi:false}, function(error, request){
        if(error){
          return next(error);
        } else { 
          if(req.query.email == 1 && request._id){
            var query = Model.findOne({_id: request._id}).populate('requestDetails').exec()                   
              .then(requestResult => {  
                Person.findById(requestResult.personId, function(error, person){
                  if(error){
                    return next(error);
                  } else {
                      var mailObj = {
                      email: person.email,
                      context: request
                    }                    
                    requestUpdated(mailObj)
                      // .then(result => {                      
                          res.status(200).json(requestResult);                                
                      // })
                      // .catch(error => {
                      //     return next(error); 
                      // });
                  }           
                })
              })
              .catch(error => { //Promise
                return next(error);
              }) 
          } else {
            res.status(200).json(request);
          }
        }
    })
  }

  function deleteRequest(clientRequest, req, res, next){
    Model.remove({_id: clientRequest._id}, function(error, request){
        if(error){
          return next(error);
        } else { 
          if(req.query.email == 1 && request._id){
            var query = Model.findOne({_id: request._id}).populate('requestDetails').exec()                   
              .then(requestResult => {  
                Person.findById(requestResult.personId, function(error, person){
                  if(error){
                    return next(error);
                  } else {
                      var mailObj = {
                      email: person.email,
                      context: request
                    }                    
                    requestUpdated(mailObj)                    
                      res.status(200).json(requestResult);                                
                  }           
                })
              })
              .catch(error => { //Promise
                return next(error);
              }) 
          } else {
            res.status(200).json(request);
          }
        }
    })
  }