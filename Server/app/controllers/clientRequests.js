'use strict'

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Model = mongoose.model('ClientRequest'),
  ClientRequestDetail = mongoose.model('ClientRequestDetail'),
  System = mongoose.model('System'),
  Assignment = mongoose.model('Assignment'),
  Course = mongoose.model('Course'),
  Person = mongoose.model('Person'),
  Product = mongoose.model('Product'),
  passport = require('passport'),
  Promise = require('bluebird'),
  ClientRequestLock = mongoose.model('ClientRequestLock'),
  logger = require('../../config/logger'),
  EmailLog = mongoose.model('EmailLog'),
  ObjectId = require('mongodb').ObjectID;

  var requireAuth = passport.authenticate('jwt', { session: false });  

  var ASSIGNED_REQUEST_CODE = '2';
  var CUSTOMER_ACTION_REQUEST_CODE = "4";

module.exports = function (app) {
  app.use('/', router);

  router.get('/api/clientRequests', requireAuth, function(req, res, next){
    logger.log('Get clientRequests');
    var query = buildQuery(req.query, Model.find());
    query.sort(req.query.order)
      .populate({path: 'requestDetails', model: 'ClientRequestDetail'} )
      .populate({path: 'personId', model: 'Person', select: 'firstName lastName fullName nickName phone ext mobile email institutionId file country'})
      .exec()
      .then(object => {
        if(object){
          res.status(200).json(object);
        } else {
          res.status(200).json({message: "No requests were found"});
        }
      })
      .catch(err => {
          return next(err);
      })
  });

  router.get('/api/clientRequestsP', requireAuth, function(req, res, next){
    logger.log('Get clientRequests');
    var query = buildQuery(req.query, Model.find());
    query.sort(req.query.order)
      .populate('requestDetails')
      .populate({path: 'personId', model: 'Person', select: 'firstName lastName fullName nickName phone ext mobile email institutionId file country'})
       .populate({ path: 'requestDetails', model: 'ClientRequestDetail', populate: {path: 'productId', model: 'Product', select: 'name'}})
      .exec()
      .then(object => {
        if(object){
          res.status(200).json(object);
        } else {
          res.status(200).json({message: "No requests were found"});
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
      .populate({path: 'requestDetails', model: 'ClientRequestDetail'} )
      .populate({path: 'courseId', model: 'Course', select: 'number name'})
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
    Model.findById(req.params.id)
     .populate({path: 'courseId', model: 'Course', select: 'number name'})
     .populate({path: 'personId', model: 'Person', select: 'firstName lastName fullName nickName phone mobile ext email institutionId file country'})
     .populate({path: 'requestDetails', model: 'ClientRequestDetail'})
     .populate({ path: 'requestDetails', model: 'ClientRequestDetail', populate: {path: 'productId', model: 'Product', select: 'name'}})
     .exec()
     .then(object => {
        if(object){
          res.status(200).json(object);
        } 
      })
      .catch(err => {
        return next(err);
      })
  });

  router.post('/api/clientRequests', requireAuth, function(req, res, next){
    logger.log('Create clientRequest','verbose');  

    var clientRequest = new Model(req.body);
    var tasks = new Array();   

    clientRequest.requestDetails = new Array();
    req.body.requestDetails.forEach(function(detail, index){
      var obj = new ClientRequestDetail(detail);
      obj.requestId = clientRequest._id;
      clientRequest.requestDetails.push(obj._id);
      tasks.push(ClientRequestDetail.create(obj)); 
    });

    Promise.all(tasks)
      .then(function(results) {     
        clientRequest.save(function (err, result) {         
          if (err) {
            return next(err);
          } else {                                
            res.status(200).json(result);
          }
        }) 
      })
  });

  router.post('/api/clientRequests/sendMail', requireAuth, function(req, res, next){
    logger.log("Send email to " + req.body.email, 'verbose');

    if(req.body){
       switch(req.body.reason){
        case 1: //request created
           var context = {
                      products: req.body.products,
                      MESSAGE: req.body.MESSAGE,
                      BOTTOM: req.body.BOTTOM
                    }   
          var mailObj = {
            email: req.body.email,
            cc: req.body.cc,
            context: context 
          }                                     

          requestCreated(mailObj);

          break;
        case 2: //request Updated
          var context = {
                      product: req.body.product,
                      requestNo: req.body.requestNo,
                      name: req.body.name,
                      numStudents: req.body.numStudents
                    }   
          var mailObj = {
            email: req.body.email,
            cc: req.body.cc,
            context: context 
          }     
          sendEmail(req.body)                             
          break;
        case 3:
           var context = {
                      product: req.body.product,
                      requestNo: req.body.clientRequestNo,
                      customerMessage: req.body.customerMessage
                    }   
          var mailObj = {
            email: req.body.email,
            context: context 
          }            
                              
          customerAction(mailObj);

          var LogEntry = new EmailLog({
            personId: req.body.personId,
            email: req.body.email,
            body: req.body.customerMessage,
            from: req.body.from,
            topic: 'c',
            subject: req.body.subject
          });
    
          LogEntry.save();
            
          break; 
       }
    }
    res.status(201).json({message: "Email sent"});
  })

  router.put('/api/clientRequests/assignBULK', requireAuth, function(req, res, next){
    logger.log('Assign bulk');
    if(req.body._id){
      var detailId;
      var query = Model.findById(req.body._id, function(err, clientRequest){
        if(err){
          return next(error);
        }
        if(clientRequest) {
          clientRequest.requestStatus = req.body.requestStatus;
          clientRequest.audit = req.body.audit;
        }
        if(req.body.systemsToSave){
          
        }

        if(req.body.requestDetailsToSave){      
          var updates = req.body.requestDetailsToSave.map(detail => {     
            if(detail._id){
              detailId = detail._id;              
              return { 
                updateOne: { 
                    "filter": { "_id": detail._id },              
                    "update": detail 
                } 
              }   
            }
          });      
        } 


      });
    }
  });

  router.put('/api/clientRequests/assign', requireAuth, function(req, res, next){
    logger.log('Assign clientRequest ' + req.body._id);      
    if(req.body._id){
      var detailId;
      var query = Model.findById(req.body._id, function(err, clientRequest){     
        if(err){
          return next(error);
        }     
        if(clientRequest) {
          clientRequest.requestStatus = req.body.requestStatus;
          clientRequest.audit = req.body.audit;
        }
        let tasks = new Array();   
        if(req.body.requestDetailsToSave){
          req.body.requestDetailsToSave.forEach((detail, index) => {            
            detailId = detail._id;                        
            tasks.push(ClientRequestDetail.findOneAndUpdate({_id: detail._id}, detail, {safe:true, new:true, multi:false, upsert:true }));
          });
        }   
        
        if(req.body.systemsToSave){
          req.body.systemsToSave.forEach(detail => {                               
            tasks.push(System.findOneAndUpdate({_id: detail._id}, detail, {safe:true, new:true, multi:false, upsert:true }));
          });
        }
    
        Promise.all(tasks)
            .then(request => {                               
              Model.findOneAndUpdate({_id: clientRequest._id}, {$set: clientRequest}, {safe:true, new:true, multi:false}, function(error, request){
                    if(error){
                      return next(error);
                    } else { 
                      ClientRequestDetail.findById(detailId)
                      .populate({ path: 'requestId', model: 'ClientRequest', populate: {path: 'personId', model: 'Person', select: 'firstName lastName fullName nickName phone mobile ext email institutionId file country'}})
                      .populate({ path: 'requestId', model: 'ClientRequest', populate: {path: 'institutionId', model: 'Institution', select: 'name'}})
                      .populate({ path: 'requestId', model: 'ClientRequest', populate: {path: 'courseId', model: 'Course', select: 'number name'}})
                      .populate({ path: "productId", model: "Product", select: "name"})
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
                    }
              })
            })
            .catch(error => { //Promise        
                return next(error);
            })
      })
    }
  });

  router.put('/api/clientRequests/deleteAssignment', requireAuth, function(req, res, next){
    var detailId;
    var clientRequest = new Model(req.body);   
    if(req.body.requestDetailsToSave){      
      var updates = req.body.requestDetailsToSave.map(detail => {     
        if(detail._id){
          detailId = detail._id;              
          return { 
            updateOne: { 
                "filter": { "_id": detail._id },              
                "update": detail 
            } 
          }   
        }
      });      
    }  
    ClientRequestDetail.bulkWrite(updates, function(err, result) {
      if(err){
        return next(error);
      }             
      Model.findOneAndUpdate({_id: clientRequest._id}, {$set: clientRequest}, function(err, request) {        
        if (err) {
          return next(err);
        }                               
        ClientRequestDetail.findById(detailId)
          .populate({ path: 'requestId', model: 'ClientRequest', populate: {path: 'personId', model: 'Person', select: 'firstName lastName fullName nickName phone mobile ext email institutionId file country'}})
          .populate({ path: 'requestId', model: 'ClientRequest', populate: {path: 'institutionId', model: 'Institution', select: 'name'}})
          .populate({ path: 'requestId', model: 'ClientRequest', populate: {path: 'courseId', model: 'Course', select: 'number name'}})
          .populate({ path: "productId", model: "Product", select: "name"})
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
    });
  });

  router.put('/api/clientRequests', requireAuth, function(req, res, next){
    logger.log('Update clientRequest ' + req.body._id);     
    
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

  router.put('/api/clientRequests/:id', requireAuth, function(req, res, next){
    logger.log('Update clientRequest ' + req.params._id);       
    let clientRequest = new Model(req.body); 
     Model.findOneAndUpdate({_id: clientRequest._id}, {$set:clientRequest}, {safe:true, new:true, multi:false}, function(error, request){
        if(error){
          return next(error);
        } else { 
         var updates = req.body.requestDetails.map(function (item) { 
            return { 
                "updateOne": { 
                    "filter": { "_id": item._id } ,              
                    "update": { audit: item.audit, requestStatus: item.requestStatus.toString()} } 
                }         
        });
        ClientRequestDetail.bulkWrite(updates, function(err, result) {
          if(err){
            return next(error);
          }
          res.status(200).json(request);
        });
         
        }
    });
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
  router.get('/api/clientRequestsDetailsTest', requireAuth, function(req, res, next){ 
    logger.log('Get clientRequests', 'verbose');
    console.log('is this it')
    var query = buildQuery(req.query, ClientRequestDetail.find());
    query
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

  router.get('/api/clientRequestsDetails', requireAuth, function(req, res, next){ 
    logger.log('Get clientRequests', 'verbose');
    console.log('is this it')
    var query = buildQuery(req.query, ClientRequestDetail.find());
    query
      .select('requestStatus requiredDate createdDate requestId productId assignments.systemId assignments.client')
      .populate({ path: 'requestId', model: 'ClientRequest', populate: {path: 'personId', model: 'Person', select: 'firstName lastName fullName nickName phone mobile ext email institutionId file country'}})
      .populate({ path: 'requestId', model: 'ClientRequest', populate: {path: 'institutionId', model: 'Institution', select: 'name'}})
      .populate({ path: 'requestId', model: 'ClientRequest', populate: {path: 'courseId', model: 'Course', select: 'number name'}})
      .populate({ path: "productId", model: "Product", select: "name"})
      .exec()
      .then(object => {
        if(object){
          object.forEach(item => {
            if(item.requestId) item.requestId.audit = [];
          });
          res.status(200).json(object);
        } else {
          res.status(404).json({message: "No requests were found"});
        }
      })
      .catch(err => {
        return next(err);
      })
  });

  // router.get('/api/clientRequestsDetailsOLD', requireAuth, function(req, res, next){
  //   logger.log('Get clientRequests', 'verbose');
  //   var query = buildQuery(req.query, ClientRequestDetail.find());
  //   query.populate({ path: 'requestId', model: 'ClientRequest', populate: {path: 'personId', model: 'Person', select: 'firstName lastName fullName nickName phone mobile ext email institutionId file country'}})
  //   query.exec()
  //     .then(object => {
  //       if(object){
  //         res.status(200).json(object);
  //       } else {
  //         res.status(404).json({message: "No requests were found"});
  //       }
  //     })
  //     .catch(err => {
  //       return next(err);
  //     })
  // });

  router.get('/api/clientRequestsDetails/analytics', requireAuth, function(req, res, next){
    logger.log('Get clientRequests', 'verbose');
    var query = buildQuery(req.query, ClientRequestDetail.find());
    query
    .select('')
    .populate({ path: 'requestId', model: 'ClientRequest', populate: {path: 'personId', model: 'Person', select: 'firstName lastName fullName nickName phone mobile ext email institutionId file country'}})
    .populate({ path: 'requestId', model: 'ClientRequest', populate: {path: 'institutionId', model: 'Institution', select: 'name country'}})
    .populate({ path: 'productId', model: 'Product', select: 'name'})
    query.exec()
      .then(object => {
        if(object){
          var result = [];
          object.forEach(item => {
            if(item.requestId){
              result.push({
                requestId: {clientRequestsDetails: {fullName: item.requestId.personId.fullName}, institutionId: item.requestId.institutionId, undergradIds: item.requestId.undergradIds, undergradIds: item.requestId.undergradIds},
                requestStatus: item.requestStatus,
                productId: item.productId
              });
            }
          });
          res.status(200).json(result);
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
      .populate({ path: 'requestId', model: 'ClientRequest', populate: {path: 'personId', model: 'Person', select: 'firstName lastName fullName nickName phone mobile email institutionId file country'}})
      .populate({ path: 'requestId', model: 'ClientRequest', populate: {path: 'institutionId', model: 'Institution', select: 'name'}})
      .populate({ path: 'requestId', model: 'ClientRequest', populate: {path: 'courseId', model: 'Course', select: 'number name'}})
      .populate({ path: "productId", model: "Product", select: "name"})
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
      .populate({ path: 'requestId', model: 'ClientRequest', populate: {path: 'personId', model: 'Person', select: 'firstName lastName fullName nickName phone mobile email institutionId file country'}})
      .populate({ path: 'requestId', model: 'ClientRequest', populate: {path: 'institutionId', model: 'Institution', select: 'name'}})
      .populate({ path: 'requestId', model: 'ClientRequest', populate: {path: 'courseId', model: 'Course', select: 'number name'}})
      .populate({ path: "productId", model: "Product", select: "name"})
      .exec()
    .then(results => {   
       if(results){
          var resultArray = results.filter(item => {    
            if(!item.requestId || item.requestId === null || !item.requestId.institutionId) {
              return false; 
            } else {
              return item.requestId.sessionId == req.params.sessionId && item.requestId.institutionId._id == req.params.institutionId;
            } 
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

  router.put('/api/clientRequestsDetails', function(req, res, next){
    logger.log('Update request detail', 'verbose');  
    
    Model.findOneAndUpdate({_id: req.body.requestId._id}, req.body.requestId, function(err, request){
      if(err) return next(err);
        ClientRequestDetail.findOneAndUpdate({_id: req.body._id}, req.body, function(err, requestDetail){
          if(err) return next(err);
          ClientRequestDetail.findById(requestDetail._id)
            .populate({ path: 'requestId', model: 'ClientRequest', populate: {path: 'personId', model: 'Person', select: 'firstName lastName fullName nickName phone mobile email institutionId file country'}})
            .populate({ path: 'requestId', model: 'ClientRequest', populate: {path: 'institutionId', model: 'Institution', select: 'name'}})
            .populate({ path: 'requestId', model: 'ClientRequest', populate: {path: 'courseId', model: 'Course', select: 'number name'}})
            .populate({ path: "productId", model: "Product", select: "name"})
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
    }); 
  });

  router.delete('/api/clientRequestsDetails/:id', requireAuth, function(req, res, next){
    logger.log('Delete clientRequestsDetails ', req.params.id);

    ClientRequestDetail.findByIdAndRemove(req.params.id, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(204).json({message: "Request deleted"});
      }
    })
  });

  router.delete('/api/clientRequestsDetails/:id/:requestid', requireAuth, function(req, res, next){
    logger.log('Delete clientRequestsDetails ', req.params.id); 
    if(req.params.requestid){    
      Model.findById(req.params.requestid, function(err, request) {
        if(err){
          return next(err);
        } else {         
          if(request){      
            if(request.requestDetails && request.requestDetails.length > 0){      
              request.requestDetails.splice(request.requestDetails.indexOf(req.params.id), 1);                     
              if(request.requestDetails.length === 0) { 
                Model.findOneAndRemove({_id: request._id}, function(err, request) {
                  if(err) {
                    return next(err);
                  }                                    
                });            
              } else {
                request.save(function(err, request) {
                  if(err) {
                    return next(err);
                  } 
                });
              }
            }
          }
        }
      })
    }

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

  router.get('/api/serverAssignments/:id', function(req, res, next){
    var serverId = req.params.id;
    ClientRequestDetail.find()
    .select('requestId productId assignments')
    .populate({path:  'requestId', model: 'ClientRequest', select: 'personId institutionId' })
    .populate({ path: 'requestId', model: 'ClientRequest', populate: {path: 'personId', model: 'Person', select: 'firstName lastName fullName institutionId'}})
    .populate({ path: 'requestId', model: 'ClientRequest', populate: {path: 'institutionId', model: 'Institution', select: 'name'}})
    .populate({ path: "productId", model: "Product", select: "name"})
         .then(results => {
      results = results.filter(item => {
        var keep = false;
        item.assignments.forEach(ass =>{          
          if(ass.systemId == serverId) keep = true;
        });
        return keep;
      });
      var assignments = new Array();
      results.forEach(item => {
        item.assignments.forEach(assign => {
          assignments.push({
          product: item.productId.name,
          institution: item.requestId.institutionId.name,
          firstName:  item.requestId.personId.firstName,
          lastName:  item.requestId.personId.lastName,
          client: assign.client,
          studentIds: assign.studentUserIds,
          studentPassword: assign.studentPassword,
          facultyIds: assign.facultyUserIds,
          facultyPassword: assign.facultyPassword,
          assignDate: assign.assignedDate
        })
      })

      })
      res.status(200).json(assignments);
    })
  })

};

  function updateRequest(clientRequest, req, res, next){
      Model.findOneAndUpdate({_id: clientRequest._id}, {$set:clientRequest}, {safe:true, new:true, multi:false}, function(error, request){
        if(error){
          return next(error);
        } else { 
          res.status(200).json(request);
        }
    })
  }

  function deleteRequest(clientRequest, req, res, next){
    Model.remove({_id: clientRequest._id}, function(error, request){
        if(error){
          return next(error);
        } else { 
            res.status(200).json(request);
        }
    })
  }