var express = require('express'),
  debug = require('debug')('uccss'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Model = mongoose.model('HelpTicket'),
  Person = mongoose.model('Person')
  Content = mongoose.model('HelpTicketContent'),
  multer = require('multer'),
  mkdirp = require('mkdirp'),
  passport = require('passport'),
  HelpTicketLock = mongoose.model('HelpTicketLock'),
  logger = require('../../config/logger');

  var requireAuth = passport.authenticate('jwt', { session: false });  

module.exports = function (app, config) {
  app.use('/', router);

  router.get('/api/helpTickets', requireAuth, function(req, res, next){
    debug('Get helpTicket');
    var query = buildQuery(req.query, Model.find())
    query.exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/helpTickets/current',requireAuth,  function(req, res, next){
    debug('Get helpTicket');
    Model.find( { $or:[ {'helpTicketStatus':1}, {'helpTicketStatus':2}, {'helpTicketStatus':3} ]})
      .sort(req.query.order)
      .exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/helpTickets/current/count', requireAuth, function(req, res, next){
    debug('Get helpTicket');
    var query = buildQuery(req.query, Model.find( { $or:[ {'helpTicketStatus':1}, {'helpTicketStatus':2}, {'helpTicketStatus':3} ]}))
    //var query = buildQuery(req.query, Model.find({ $or:[ {'helpTicketStatus':1}, {'helpTicketStatus':2}, {'helpTicketStatus':3} ]}))
    //query.exec(function(err, object){
    // Model.find( { $or:[ {'helpTicketStatus':1}, {'helpTicketStatus':2}, {'helpTicketStatus':3} ]})
      // .sort(req.query.order)
      query.exec(function(err, object){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.get('/api/helpTickets/current/count/:personId', requireAuth, function(req, res, next){
    debug('Get helpTicket');
    Model.find( { 'personId': req.params.personId, $or:[ {'helpTicketStatus':1}, {'helpTicketStatus':2}, {'helpTicketStatus':3} ]})
      .sort(req.query.order)
      .exec(function(err, object){
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
  });

  router.get('/api/helpTickets/count', requireAuth, function(req, res, next){
    debug('Get helpTicket');
    var query = buildQuery(req.query, Model.find())
    query.exec(function(err, object){
      if (err) {
          return next(err);
        } else {
          res.status(200).json({count: object.length});
        }
      });
  });

  router.get('/api/helpTickets/:id', requireAuth, function(req, res, next){
    debug('Get help ticket [%s]', req.params.id);
    Model.findById(req.params.id, function(err, object){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.post('/api/helpTickets', requireAuth, function(req, res, next){
    debug('Create HelpTicket');
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
                email: person.email,
                type: 'help-ticket-created',
                context: object
              }          
              sendMail(mailObj);
            }
          })
          
        }
        res.status(200).json(object);
      }
    });
  });

  router.put('/api/helpTickets/content/:id', requireAuth, function(req, res, next){
    debug('Update HelpTicket [%s]', req.body._id);
    Model.findById(req.params.id, function(err, result){
      if (err) {
        return next(err);
      } else {
        var content = new Content(req.body);
        result.content.push(content);
        result.save(function(err, result){
          if (err) {
            return next(err);
          } else {
            res.status(200).json(content);
          }
        })
      }
    })
  });

  router.put('/api/helpTickets/owner/:id', requireAuth, function(req, res, next){
    debug('Update HelpTicket [%s]', req.body._id);
    Model.findById(req.params.id, function(err, result){
      if (err) {
        return next(err);
      } else {
        if(req.body.personId != result.owner[0].personId){
          result.owner.unshift({
            personId: req.body.personId,
            dateAssigned: new Date()
          });
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
      }
    })
  });

  router.put('/api/helpTickets/status/:id', requireAuth, function(req, res, next){
    debug('Update HelpTicket [%s]', req.body._id);
    Model.findById(req.params.id, function(err, result){
      if (err) {
        return next(err);
      } else {
        result.helpTicketStatus = req.body.helpTicketStatus;
        result.save(function(err, result){
          if (err) {
            return next(err);
          } else {
            res.status(200).json(result);
          }
        })
      }
    })
  });

  router.put('/api/helpTickets/keywords/:id', requireAuth, function(req, res, next){
    debug('Update HelpTicket [%s]', req.body._id);
    Model.findById(req.params.id, function(err, result){
      if (err) {
        return next(err);
      } else {
        result.keyWords = req.body.keyWords;
        result.save(function(err, result){
          if (err) {
            return next(err);
          } else {
            res.status(200).json(result);
          }
        })
      }
    })
  });

  router.put('/api/helpTickets', requireAuth, function(req, res, next){
    debug('Update HelpTicket [%s]', req.body._id);

    Model.findOneAndUpdate({_id: req.body._id}, req.body, {safe:true, multi:false}, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(200).json(result);
      }
    })
  });

  router.put('/api/helpTickets/sendMail/:id', requireAuth, function(req, res, next){
    debug('Update HelpTicket [%s]', req.body._id);
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
    debug('Delete session [%s]', req.params.id);
    Model.removeById(req.params.id, function(err, result){
      if (err) {
        return next(err);
      } else {
        res.status(204).json(result);
      }
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
      logger.log('Get helpTicket Locks','verbose');
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
      logger.log('Get helpTicket Locks' + req.params.id,'verbose');
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
     logger.log('Create helpTicket Lock','verbose');
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
      logger.log('Delete Help Ticket Lock ' + req.params.id, 'verbose');
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

};
