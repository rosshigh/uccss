var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Model = mongoose.model('HelpTicket'),
    Person = mongoose.model('Person')
    Content = mongoose.model('HelpTicketContent'),
    multer = require('multer'),
    mkdirp = require('mkdirp'),
    passport = require('passport'),
    HelpTicketLock = mongoose.model('HelpTicketLock'),
    HelpTicketTypes = mongoose.model('HelpTicketTypes'),
    writeLog = require('../../config/logger');

  var requireAuth = passport.authenticate('jwt', { session: false });  

module.exports = function (app, config) {
  app.use('/', router);

  router.get('/api/helpTickets', requireAuth, function(req, res, next){
    writeLog.log('Get helpTicket','verbose');
    var query = buildQuery(req.query, Model.find())
    query.exec()
    .then(object => {
      res.status(200).json(object);
    })
    .catch(error => {
       return next(error);
    })
  });

  router.get('/api/helpTickets/current',requireAuth,  function(req, res, next){
    writeLog.log('Get helpTicket', 'verbose');
    Model.find( { $or:[ {'helpTicketStatus':1}, {'helpTicketStatus':2}, {'helpTicketStatus':3} ]})
      .sort(req.query.order)
      .exec()
      .then(object => {
        res.status(200).json(object);
      })
      .catch(error => {
        return next(error);
      })
  });

  router.get('/api/helpTickets/current/count', requireAuth, function(req, res, next){
    writeLog.log('Get helpTicket');
    var query = buildQuery(req.query, Model.find( { $or:[ {'helpTicketStatus':1}, {'helpTicketStatus':2}, {'helpTicketStatus':3} ]}))
      query.exec()
      .then(object => {
        res.status(200).json(object);
      })
      .catch(error => {
        return next(error);
      })
  });

  router.get('/api/helpTickets/current/count/:personId', requireAuth, function(req, res, next){
    writeLog.log('Get helpTicket', 'verbose');
    Model.find( { 'personId': req.params.personId, $or:[ {'helpTicketStatus':1}, {'helpTicketStatus':2}, {'helpTicketStatus':3} ]})
      .sort(req.query.order)
      .exec()
      .then(object => {
        res.status(200).json(object);
      })
      .catch(error => {
        return next(error);
      })
  });
 
  router.get('/api/helpTickets/count', requireAuth, function(req, res, next){
    writeLog.log('Get helpTicket', 'verbose');
    var query = buildQuery(req.query, Model.find())
    query.exec()
      .then(object => {
        res.status(200).json({count: object.length});
      })
      .catch(error => {
        return next(error);
      })
  });

  router.get('/api/helpTickets/:id', requireAuth, function(req, res, next){
    writeLog.log('Get help ticket '+ req.params.id, 'verbose');
    Model.findById(req.params.id)
    .exec()
      .then(object => {
        if(object){
          res.status(200).json(object);
        } else {
          res.status(404).json({message: "Not Found"});
        }
        
      })
      .catch(error => {
        return next(error);
      })
  });

  router.post('/api/helpTickets', requireAuth, function(req, res, next){
    writeLog.log('Create HelpTicket', "verbose");
    var helpTicket =  new Model(req.body);
    helpTicket.save( function ( err, object ){
      if (err) {
        return next(err);
      } else {          

        if(req.query.email == 1){        
          Person.findById(object.personId, function(err, person){                     
            if(err){
              return next(err);
            } else {                    
              var mailObj = {
                name: person.fullName,
                email: person.email,
                context: object
              }             
              helpTicketCreated(mailObj); 
              res.status(200).json(object);           
            }
          })
        } else {
          res.status(200).json(object);
        }
      }
    });
  });

  router.put('/api/helpTickets/content/:id/:status', requireAuth, function(req, res, next){
    writeLog.log('Update HelpTicket ' + req.body._id, 'verbose');
    Model.findById(req.params.id).exec()
    .then(result => {
        var content = new Content(req.body);
        result.content.push(content);
        result.helpTicketStatus = req.params.status;
        result.modifiedDate = new Date();
        result.save(function ( err, result ){ 
          if(err){
            return next(err);
          } else {         
            if(req.body.emailSent && !req.body.confidential){        
              Person.findById(result.personId).exec()
                .then(person => {
                  var mailObj = {
                      email: person.email,
                      context: {name: person.fullName, helpTicketNo: result.helpTicketNo}
                    }       
                    if(req.params.status == 6){
                      helpTicketClosed(mailObj)
                        // .then(result => {
                            res.status(200).json(content);
                        // })
                        // .catch(error => {
                        //     return next(error);
                        // });  
                    } else {
                      helpTicketUpdated(mailObj)
                        // .then(result => {
                            res.status(200).json(content);
                        // })
                        // .catch(error => {
                        //     return next(error);
                        // });  
                    }     
                })
                .catch(error => {
                  return next(error);
                })
            } else {
              res.status(200).json(content);
            }
          }
    })
    })
    .catch(error => {
       return next(error);
    })
  });

  router.put('/api/helpTickets/owner/:id', requireAuth, function(req, res, next){
    writeLog.log('Update HelpTicket owner', 'verbose');
    Model.findById(req.params.id).exec()
    .then(result => {   
        if(req.body.personId != result.owner[0].personId){
          result.owner.unshift({
            personId: req.body.personId,
            dateAssigned: new Date()
          });
          result.helpTicketStatus = req.body.status;
          result.save(function(err, result){
            if (err) {
              return next(err);
            } else {
              res.status(200).json(result);
            }
          })
        } else {
          res.status(200).json(result);
        }
      })
      .catch(error => {
        return next(error);
      })
  });

  router.put('/api/helpTickets/status/:id', requireAuth, function(req, res, next){
    writeLog.log('Update HelpTicket '+ req.body._id, 'verbose');
    Model.findById(req.params.id)
    .exec()
    .then(result => {
        result.helpTicketStatus = req.body.helpTicketStatus;
        result.save(function(error, result){
          if (error) {
            return next(error);
          } else {
            res.status(200).json(result);
          }
        })
      })
      .catch(error => {
        return next(error);
      })
  });

  router.put('/api/helpTickets/keywords/:id', requireAuth, function(req, res, next){
    writeLog.log('Update HelpTicket '+ req.body._id, 'verbose');
    Model.findById(req.params.id)
    .exec()
    .then(result => {
        result.keyWords = req.body.keyWords;
        result.save(function(err, result){
          if (err) {
            return next(err);
          } else {
            res.status(200).json(result);
          }
        })
      })
      .catch(error => {
        return next(error);
      })
  });

  router.put('/api/helpTickets', requireAuth, function(req, res, next){
    writeLog.log('Update HelpTicket '+ req.body._id, 'verbose');

    Model.findOneAndUpdate({_id: req.body._id}, req.body, {new:true, safe:true, multi:false})
    .exec()
    .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        return next(error);
      })
  });

  router.put('/api/helpTickets/sendMail/:id', requireAuth, function(req, res, next){
    writeLog.log('Update HelpTicket ' + req.body._id, 'verbose');
    if(req.body.audit){
      Model.findById(req.params.id, function(err, result){
        if (err) {
          return next(err);
        } else {
          result.audit.push(req.body.audit);
          result.save(function(err, result){
            if (err) {
              return next(err);
            } else {
              var obj = {
                subject: 'Help Ticket Updated',
                email: req.body.toEmail,
                template: 'help-ticket-response',
                context: {
                  customerMessage: req.body.customerMessage
                }
              };
              sendMail(obj);
              res.status(200).json(content);
            }
          })
        }
      })
    }
  });

  router.delete('/api/helpTickets/:id', requireAuth, function(req, res, next){
    writeLog.log('Delete session ' + req.params.id, 'verbose');
    Model.removeById(req.params.id)
    .exec()
    .then(result => {
        res.status(204).json(result);
      })
      .catch(error => {
        return next(error);
      })
  });

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {

      var path = config.uploads + '/helpTickets/' + req.params.container;
     
      mkdirp(path, function(err) {
        if(err){
          res.status(500).json(err);
        } else {
          cb(null, path);
        }
      });
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + file.originalname.substring(file.originalname.indexOf('.')));
    }
  });

  var upload = multer({ storage: storage});

  router.post('/api/helpTickets/upload/:id/:container/:contentId',  upload.any(), function(req, res, next){
     writeLog.log('Upload File ', 'verbose');    
      Model.findById(req.params.id, function(err, helpticket){   
        if(err){
          return next(err);
        } else {
          if(req.params.contentId){
            var id = req.params.contentId;
          
            var content = helpticket.content.id(id);   
            if(content){
              for(var i = 0, x = req.files.length; i<x; i++){            
                var file =  {
                  originalFilename: req.files[i].originalname,
                  fileName: req.files[i].filename,
                  dateUploaded: new Date()
                };
                content.files.push(file);
              }
              helpticket.save(function(err, helpticket) {
                if(err){
                  return next(err);
                } else {
                  res.status(200).json(helpticket);
                }
              });
            }        
            
          } else {
            res.status(200).json({message: 'file uploaded'});
          }
        }
      });

  });
  
  router.get('/api/helpTicketLocks', function(req, res, next){
      writeLog.log('Get helpTicket Locks','verbose');
      HelpTicketLock.find()
        .sort("-createdAt")
        .exec()
        .then(function(locks){
          res.status(200).json(locks);
        })
        .catch(function(err){
          return next(err);
			})

  });

  router.get('/api/helpTicketLocks/:id',  function(req, res, next){
    writeLog.log('Get helpTicket Locks' + req.params.id,'verbose');
    HelpTicketLock.find({helpTicketId: req.params.id})
      .sort("-createdAt")
      .exec()
      .then(function(locks){         
        if(locks.length === 0){
          res.status(200).json({helpTicketId: 0});
        } else {
          res.status(200).json(locks);
        }
      })
      .catch(function(err){
        return next(err);
    })

  });

  router.post('/api/helpTicketLocks',  function(req, res, next){
     writeLog.log('Create helpTicket Lock','verbose');
      var helpTicketLock =  new HelpTicketLock(req.body);
      helpTicketLock.save()
				.then(function (result) {
					res.status(201).json(result);
				})
				.catch(function (err) {
					return next(err);
				});
  });

  router.delete('/api/helpTicketLocks/:id',  function(req, res, next){
    writeLog.log('Delete Help Ticket Lock ' + req.params.id, 'verbose');
    var query = HelpTicketLock.remove({ helpTicketId: req.params.id })
      .exec()
      .then(function (result) {
        res.status(200).json({"message" : "Lock removed"});
      })
      .catch(function (err) {
        return next(err);
      });

  });

  router.post('/api/sendMail', function(req,res,next){
    var mailObj = {
              email: 'hightowe@uwm.edu',
              subject: 'Help Ticket Created',
              template: 'help-ticket-created',
              context: {helpTicketNo: 5}
            }
            sendMail(mailObj);
  })

  router.get('/api/helpTicketsTypes', requireAuth, function(req, res, next){
    writeLog.log('Get helpTicketypes Frick','verbose');
    var query = buildQuery(req.query, HelpTicketTypes.find())
      query.exec()
      .then(object => {
        res.status(200).json(object);
      })
      .catch(error => {
        return next(error);
      })
  });

  router.post('/api/helpTicketsTypes', requireAuth, function(req, res, next){
    writeLog.log('Create HelpTicketTypes', "verbose");
    var helpTicketType =  new HelpTicketTypes(req.body);
    helpTicketType.save( function ( err, object ){
      if (err) {
        return next(err);
      } else {          
          res.status(200).json(object);
      }
    });
  });

  router.put('/api/helpTicketsTypes', requireAuth, function(req, res, next){
    writeLog.log('Update HelpTicket Type '+ req.body._id, 'verbose');

    HelpTicketTypes.findOneAndUpdate({_id: req.body._id}, req.body, {safe:true, multi:false})
    .exec()
    .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        return next(error);
      })
  });

};
