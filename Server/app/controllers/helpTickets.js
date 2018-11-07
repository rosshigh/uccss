'use strict'

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Model = mongoose.model('HelpTicket'),
  HelpTicketArchive = mongoose.model('HelpTicketArchive'),
  Content = mongoose.model('HelpTicketContent'),
  multer = require('multer'),
  mkdirp = require('mkdirp'),
  passport = require('passport'),
  HelpTicketLock = mongoose.model('HelpTicketLock'),
  HelpTicketTypes = mongoose.model('HelpTicketTypes'),
  KnowledgeBase = mongoose.model('KnowledgeBase'),
  logger = require('../../config/logger'),
  fs = require('fs'),
  ObjectId = require('mongodb').ObjectID;;

var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
  app.use('/', router);

  router.get('/api/helpTickets', requireAuth, function (req, res, next) {
    logger.log('info','Get helpTicket');
    var query = buildQuery(req.query, Model.find())
      .populate('courseId', 'name number')
      .populate('requestId')
      .populate('personId', 'email firstName lastName fullName phone mobile nickName file country')
      .populate('content.personId', 'email firstName lastName phone mobile nickName')
      .populate('institutionId', 'name')
      .populate({ path: 'owner.personId', model: 'Person', select: 'firstName lastName fullName' })
    query.exec()
      .then(object => {
        res.status(200).json(object);
      })
      .catch(error => {
        return next(error);
      })
  });

  router.get('/api/helpTickets/mine/:personId', requireAuth, function (req, res, next) {
    logger.log('info','Get helpTicket');
    var query = Model.find()
      .where('helpTicketStatus').gt(6)
      .where('owner[0].personId.id').equals(req.params.id)
      .populate('courseId', 'name number')
      .populate('requestId')
      .populate('personId', 'email firstName lastName fullName phone mobile nickName file country')
      .populate('content.personId', 'email firstName lastName phone mobile nickName')
      .populate('institutionId', 'name')
      .populate({ path: 'owner.personId', model: 'Person', select: 'firstName lastName fullName' })
    query.exec()
      .then(object => {
        res.status(200).json(object);
      })
      .catch(error => {
        return next(error);
      })
  });

  router.get('/api/helpTickets/archived', requireAuth, function (req, res, next) {
    logger.log('info','Get helpTicket');
    var query = buildQuery(req.query, HelpTicketArchive.find())
      .populate('courseId', 'name number')
      .populate('requestId')
      .populate('personId', 'email firstName lastName fullName phone mobile nickName file country')
      .populate('content.personId', 'email firstName lastName phone mobile nickName')
      .populate('institutionId', 'name')
      .populate({ path: 'owner.personId', model: 'Person', select: 'firstName lastName fullName' })
    query.exec()
      .then(object => {
        res.status(200).json(object);
      })
      .catch(error => {
        return next(error);
      })
  });

  router.get('/api/helpTickets/users', requireAuth, function (req, res, next) {
    logger.log('info','Get user helpTicket');
    var query1 = buildQuery(req.query, Model.find())
      .populate('courseId', 'name number')
      .populate('requestId')
      .populate('personId', 'email firstName lastName fullName phone mobile nickName file country')
      .populate('content.personId', 'email firstName lastName phone mobile nickName')
      .populate('institutionId', 'name')
      .populate({ path: 'owner.personId', model: 'Person', select: 'firstName lastName fullName' })
    query1.exec()
      .then(object1 => {
        var query2 = buildQuery(req.query, HelpTicketArchive.find())
          .populate('courseId', 'name number')
          .populate('requestId')
          .populate('personId', 'email firstName lastName fullName phone mobile nickName file country')
          .populate('content.personId', 'email firstName lastName phone mobile nickName')
          .populate('institutionId', 'name')
          .populate({ path: 'owner.personId', model: 'Person', select: 'firstName lastName fullName' })
        query2.exec()
          .then(object2 => {
            object1.forEach(item => {
              object2.push(item);
            })
            res.status(200).json(object2);
          })
          .catch(error => {
            return next(error);
          })
      })
      .catch(error => {
        return next(error);
      })
  });

  router.get('/api/helpTickets/analytics', requireAuth, function (req, res, next) {
    logger.log('info','Get helpTicket');
    var query = buildQuery(req.query, Model.find())
      .populate('courseId', 'name number')
      .populate('requestId')
      .populate('personId', 'email firstName lastName phone mobile nickName file country')
      .populate('institutionId', 'name')
      .populate('owner.personId', 'firstName lastName _id')
      .populate({ path: 'productId', model: 'Product', select: 'name' })
    query.exec()
      .then(object => {
        res.status(200).json(object);
      })
      .catch(error => {
        return next(error);
      })
  });

  router.get('/api/helpTickets/current', requireAuth, function (req, res, next) {
    logger.log('info','Get helpTicket');
    Model.find({ $or: [{ 'helpTicketStatus': 1 }, { 'helpTicketStatus': 2 }, { 'helpTicketStatus': 3 }] })
      .sort(req.query.order)
      .exec()
      .then(object => {
        res.status(200).json(object);
      })
      .catch(error => {
        return next(error);
      })
  });

  router.get('/api/helpTickets/current/count', requireAuth, function (req, res, next) {
    logger.log('info','Get helpTicket');
    var query = buildQuery(req.query, Model.find({ $or: [{ 'helpTicketStatus': 1 }, { 'helpTicketStatus': 2 }, { 'helpTicketStatus': 3 }] }))
    query.exec()
      .then(object => {
        res.status(200).json(object);
      })
      .catch(error => {
        return next(error);
      })
  });

  router.get('/api/helpTickets/current/count/:personId', requireAuth, function (req, res, next) {
    logger.log('info','Get helpTicket');
    Model.find({ 'personId': req.params.personId, $or: [{ 'helpTicketStatus': 1 }, { 'helpTicketStatus': 2 }, { 'helpTicketStatus': 3 }] })
      .sort(req.query.order)
      .exec()
      .then(object => {
        res.status(200).json(object);
      })
      .catch(error => {
        return next(error);
      })
  });

  router.get('/api/helpTickets/count', requireAuth, function (req, res, next) {
    logger.log('info','Get helpTicket');
    var query = buildQuery(req.query, Model.find())
    query.exec()
      .then(object => {
        res.status(200).json({ count: object.length });
      })
      .catch(error => {
        return next(error);
      })
  });

  router.post('/api/helpTickets/archive/:collection', requireAuth, function (req, res, next) {
    logger.log('info','Archive search');
    if (req.params.collection && req.params.collection === 'current') {
      var query = Model.find();
    } else {
      var query = HelpTicketArchive.find();
    }

    if (req.body.helpTicketNo) {
      query.where('helpTicketNo').equals(req.body.helpTicketNo);
    } else {
      if (req.body.dateRange) {
        query.where('createdDate').gt(req.body.dateRange.dateFrom).lt(req.body.dateRange.dateTo);
      }
      if (req.body.status && req.body.status.length > 0) {
        query.in('helpTicketStatus', req.body.status);
      }
      if (req.body.keyWords) {
        let term = new RegExp(req.body.keyWords, "i")
        query.regex('keyWords', term);
      }
      if (req.body.helpTicketType) {
        query.where('helpTicketType').equals(req.body.helpTicketType);
      }
      if (req.body.peopleIds && req.body.peopleIds.length) {
        query.where('personId').in(req.body.peopleIds);
      }
      if (req.body.productIds && req.body.productIds.length) {
        query.in('productId', req.body.productIds);
      }
      if (req.body.institutionIds && req.body.institutionIds.length) {
        query.in('institutionId', req.body.institutionIds);
      }
    }
    query.populate('courseId', 'name number')
    query.populate('requestId')
    query.populate('personId', 'email firstName lastName phone mobile nickName file country')
    query.populate('content.personId', 'email firstName lastName phone mobile nickName')
    query.populate('institutionId', 'name')
    query.populate({ path: 'owner.personId', model: 'Person', select: 'firstName lastName' })
    query.exec()
      .then(response => {
        if (response && response.length > 0) {

          if (req.body.content) {
            let searchTerm = req.body.content.toUpperCase();
            response = response.filter(item => {
              for (let i = 0; i < item.content.length; i++) {
                if (item.content[i].content.comments.toUpperCase().indexOf(searchTerm) > -1) {
                  return true;
                }
              }
              return false;
            });
          }
          res.status(200).json(response);
        } else {
          res.status(204).json({ message: "No documents found" });
        }
      })
      .catch(err => {
        return next(err);
      })
  });

  router.get('/api/helpTickets/:id', requireAuth, function (req, res, next) {
    logger.log('info','Get help ticket ' + req.params.id);
    Model.findOne({ _id: req.params.id })
      .populate('courseId', 'name number')
      .populate('requestId')
      .populate('personId', 'email firstName lastName phone mobile nickName file country')
      .populate('content.personId', 'email firstName lastName phone mobile nickName')
      .populate('institutionId', 'name')
      .populate('owner.personId', 'firstName lastName _id')
      .exec()
      .then(object => {
        res.status(200).json(object);
      })
      .catch(error => {
        return next(error);
      })
  });

  router.post('/api/helpTickets/', requireAuth, function (req, res, next) {
    logger.log('info','Create HelpTicket', "verbose");
    var helpTicket = new Model(req.body);
    helpTicket.setNext('helpTicketNo', function (err, helpTicket) {
      if (err) {
        return next(err);
      }
      helpTicket.save(function (err, object) {
        if (err) {
          return next(err);
        } else {
          res.status(200).json(object);
        }
      });
    });
  });

  router.put('/api/helpTickets/content/:id/:status', requireAuth, function (req, res, next) {
    logger.log('info','Update HelpTicket ' + req.params.id);

    if (req.params.status == 6) {
      Model.findById(req.params.id).exec()
        .then(result => {
          var content = new Content(req.body);
          result.content.push(content);
          result.helpTicketStatus = req.params.status;
          result.modifiedDate = new Date();
          var archiveHT = new HelpTicketArchive(result);
          archiveHT.save().then(result => {
            Model.remove({ _id: req.params.id }).then(result => {
              res.status(200).json(result);
            })
          })
            .catch(error => {
              return next(error);
            })
        })
        .catch(error => {
          return next(error);
        })

    } else {

      Model.findById(req.params.id).exec()
        .then(result => {
          var content = new Content(req.body);
          result.content.push(content);
          result.helpTicketStatus = req.params.status; 
          result.modifiedDate = new Date();      
          result.save().then(result => {
            res.status(200).json(result);
            // var query = Model.find({_id: req.body._id})
            //   .populate('courseId', 'name number')
            //   .populate('requestId')
            //   .populate('personId', 'email firstName lastName fullName phone mobile nickName file country')
            //   .populate('content.personId', 'email firstName lastName phone mobile nickName')
            //   .populate('institutionId', 'name')
            //   .populate({ path: 'owner.personId', model: 'Person', select: 'firstName lastName fullName' })
            // query.exec()
            //   .then(object => {
            //     res.status(200).json(object);
            //   })
            //   .catch(error => {
            //     return next(error);
            //   })
            })
            .catch(error => {
              return next(error);
            })
        })
        .catch(error => {
          return next(error);
        })
    }

  });

  router.put('/api/helpTickets/owner/:id', requireAuth, function (req, res, next) {
    logger.log('info','Update HelpTicket owner');

    Model.findById(req.params.id).exec()
      .then(result => {

        if (req.body.personId != result.owner[0].personId) {
          result.owner.unshift({
            personId: req.body.personId,
            dateAssigned: new Date()
          });
          result.helpTicketStatus = req.body.status;
          result.save(function (err, result) {
            if (err) {
              return next(err);
            } else {

              var query = Model.findOne({ _id: req.params.id })
                .populate('courseId', 'name number')
                .populate('requestId')
                .populate('personId', 'email firstName lastName phone mobile nickName file country')
                .populate('institutionId', 'name')
                .populate('owner.personId', 'firstName lastName _id')
                .populate({ path: 'productId', model: 'Product', select: 'name' })
              query.exec()
                .then(object => {
                  res.status(200).json(object);
                })
                .catch(error => {
                  return next(error);
                })
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

  router.put('/api/helpTickets/status/:id', requireAuth, function (req, res, next) {
    logger.log('info','Update HelpTicket ' + req.body._id);
    Model.findById(req.params.id)
      .exec()
      .then(result => {
        result.helpTicketStatus = req.body.helpTicketStatus;
        result.save(function (error, result) {
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

  router.put('/api/helpTickets/keywords/:id', requireAuth, function (req, res, next) {
    logger.log('info','Update HelpTicket ' + req.body._id);
    Model.findById(req.params.id)
      .exec()
      .then(result => {
        result.keyWords = req.body.keyWords;
        result.save(function (err, result) {
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

  router.put('/api/helpTickets/close', requireAuth, function (req, res, next) {
    logger.log('info','Close HelpTicket ' + req.body._id);
    var archiveHT = new HelpTicketArchive(req.body);
    archiveHT.modifiedDate = new Date();
    archiveHT.save(function (error, archivedHelpTicket) {
      if (error) return next(error);
      Model.remove({ _id: req.body._id }).then(result => {
        res.status(200).json(result);
      })
    })
  })

  router.put('/api/helpTickets', requireAuth, function (req, res, next) {
    logger.log('info','Update HelpTicket ' + req.body._id);
    Model.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true, safe: true, multi: false })
      .exec()
      .then(result => {
        Model.findOne({ _id: req.body._id })
          .populate('courseId', 'name number')
          .populate('requestId')
          .populate('personId', 'email firstName lastName phone mobile nickName country')
          .populate('content.personId', 'email firstName lastName phone mobile nickName')
          .populate('institutionId', 'name')
          .populate('owner.personId', 'firstName lastName _id')
          .exec()
          .then(response => {
            res.status(200).json(response);
          })
          .catch(err => {
            return next(error);
          })

      })
      .catch(error => {
        return next(error);
      })
  });

  router.put('/api/helpTickets/reopen', requireAuth, function (req, res, next) {
    var helpTicket = new Model(req.body);
    helpTicket.save().then(result => {
      HelpTicketArchive.remove({ _id: req.body._id })
        .then(result => {
          res.status(200).json(result);
        })
        .catch(error => {
          return next(error);
        })
    })
      .catch(error => {
        return next(error);
      })
  });

  router.put('/api/helpTickets/sendMail/:id', requireAuth, function (req, res, next) {
    logger.log('info','Update HelpTicket ' + req.body._id);
    if (req.body.audit) {
      Model.findById(req.params.id, function (err, result) {
        if (err) {
          return next(err);
        } else {
          result.audit.push(req.body.audit);
          result.save(function (err, result) {
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

  router.delete('/api/helpTickets/:id', requireAuth, function (req, res, next) {
    logger.log('info','Delete session ' + req.params.id);
    Model.remove({ _id: req.params.id })
      .exec()
      .then(result => {
        res.status(204).json(result);
      })
      .catch(error => {
        return next(error);
      })
  });

  router.get('/api/helpTickets/count/:status', function (req, res, next) {
    logger.log('info','Count tickets with status ' + req.params.status);

    Model.find({ helpTicketStatus: req.params.status }, function (err, results) {
      if (err) return next(err);

      res.status(200).json({ count: results.length });
    });
  });

  router.post('/api/helpTickets/sendMail', requireAuth, function (req, res, next) {
    logger.log('info',"Send email to " + req.body.email);
    if (req.body) {
      sendEmail(req.body);
    }
    res.status(201).json({ message: "Email sent" });
  })

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {

      var path = config.uploads + '/helpTickets/' + req.params.container;

      mkdirp(path, function (err) {
        if (err) {
          res.status(500).json(err);
        } else {
          cb(null, path);
        }
      });
    },
    filename: function (req, file, cb) {
      var path = config.uploads + '/helpTickets/' + req.params.container;
      var fileParts = file.originalname.split(".");
      var version = 1;
      while (fs.existsSync(path + "/" + file.originalname)) {
        file.originalname = fileParts[0] + "(" + version + ")." + fileParts[1];
        version += 1;
        console.log('info',file.originalname)
      }

      console.log('info',file.originalname)
      cb(null, file.originalname);
    }
  });

  var upload = multer({ storage: storage });

  router.post('/api/helpTickets/upload/:id/:container/:contentId', upload.any(), function (req, res, next) {
    logger.log('info','Upload File ');
    Model.findById(req.params.id, function (err, helpticket) {
      if (err) {
        return next(err);
      } else {
        if (req.params.contentId) {
          var id = req.params.contentId;
          var content = helpticket.content.id(id);          
          if (content) {
            for (var i = 0, x = req.files.length; i < x; i++) {
              var file = {
                originalFilename: req.files[i].originalname,
                fileName: req.files[i].filename,
                dateUploaded: new Date()
              };
              content.files.push(file);
              console.log(content)                
            }                    
            helpticket.save(function (err, helpticket) {
              if (err) {
                return next(err);
              } else {
                res.status(200).json(helpticket);
              }
            });
          }
          // res.status(404).json({message: 'Content now found'});
        } else {
          res.status(200).json({ message: 'file uploaded' });
        }
      }
    });

  });

  router.get('/api/helpTicketLocks', function (req, res, next) {
    logger.log('info','Get helpTicket Locks');
    HelpTicketLock.find()
      .sort("-createdAt")
      .exec()
      .then(function (locks) {
        res.status(200).json(locks);
      })
      .catch(function (err) {
        return next(err);
      })

  });

  router.get('/api/helpTicketLocks/:id', function (req, res, next) {
    logger.log('info','Get helpTicket Locks' + req.params.id);
    HelpTicketLock.find({ helpTicketId: req.params.id })
      .sort("-createdAt")
      .exec()
      .then(function (locks) {
        if (locks.length === 0) {
          res.status(200).json({ helpTicketId: 0 });
        } else {
          res.status(200).json(locks);
        }
      })
      .catch(function (err) {
        return next(err);
      })

  });

  router.post('/api/helpTicketLocks', function (req, res, next) {
    logger.log('info','Create helpTicket Lock');
    var helpTicketLock = new HelpTicketLock(req.body);
    helpTicketLock.save()
      .then(function (result) {
        res.status(201).json(result);
      })
      .catch(function (err) {
        return next(err);
      });
  });

  router.delete('/api/helpTicketLocks/:id', function (req, res, next) {
    logger.log('info','Delete Help Ticket Lock ' + req.params.id);
    var query = HelpTicketLock.remove({ helpTicketId: req.params.id })
      .exec()
      .then(function (result) {
        res.status(200).json({ "message": "Lock removed" });
      })
      .catch(function (err) {
        return next(err);
      });

  });

  router.post('/api/sendMail', function (req, res, next) {
    var mailObj = {
      email: 'hightowe@uwm.edu',
      subject: 'Help Ticket Created',
      template: 'help-ticket-created',
      context: { helpTicketNo: 5 }
    }
    sendMail(mailObj);
  })

  router.get('/api/helpTicketsTypes', requireAuth, function (req, res, next) {
    logger.log('info','Get helpTicketypes Frick');
    var query = buildQuery(req.query, HelpTicketTypes.find())
    query.exec()
      .then(object => {

        res.status(200).json(object);
      })
      .catch(error => {
        return next(error);
      })
  });

  router.post('/api/helpTicketsTypes', requireAuth, function (req, res, next) {
    logger.log('info','Create HelpTicketTypes', "verbose");
    var helpTicketType = new HelpTicketTypes(req.body);
    helpTicketType.save(function (err, object) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(object);
      }
    });
  });

  router.put('/api/helpTicketsTypes', requireAuth, function (req, res, next) {
    logger.log('info','Update HelpTicket Type ' + req.body._id);

    HelpTicketTypes.findOneAndUpdate({ _id: req.body._id }, req.body, { safe: true, multi: false })
      .exec()
      .then(result => {
        res.status(200).json({ message: "Help Ticket Type Updated" });
      })
      .catch(error => {
        return next(error);
      })
  });

  router.post('/api/helpTickets/archiveClosed', function (req, res, next) {
    logger.log('info','Archiving closed help tickets');
    Model.find({ helpTicketStatus: 6 }, function (err, result) {
      if (err) {
        return next(err);
      }
      var numTickets = result.length;
      var bulk = HelpTicketArchive.collection.initializeOrderedBulkOp();
      var counter = 0;

      result.forEach(function (doc) {
        bulk.insert(doc);
        counter++;
      });
      if (counter > 0) {
        bulk.execute(function (err, result2) {
          if (err) {
            return next(err);
          }
          var bulk2 = Model.collection.initializeOrderedBulkOp();
          var counter2 = 0;
          result.forEach(function (doc) {
            bulk2.find({ _id: doc._id }).remove();
            counter2++;
          });
          if (counter2) {
            bulk2.execute(function (err, results) {
              if (err) {
                res.status(500).json({ message: "helptickets not deleted" });
              }
              res.status(200).json({ message: 'Help Tickets Archived', number: numTickets });
            })
          }
        });
      }
    });
  });

  router.get('/api/helpTicketsArchive', function (req, res, next) {
    logger.log('info','Get helpTicket');
    var query = buildQuery(req.query, HelpTicketArchive.find())
      .populate('courseId', 'name number')
      .populate('requestId')
      .populate('personId', 'email firstName lastName fullName phone mobile nickName file country')
      .populate('content.personId', 'email firstName lastName phone mobile nickName')
      .populate('institutionId', 'name')
      .populate({ path: 'owner.personId', model: 'Person', select: 'firstName lastName fullName' })
    query.exec()
      .then(object => {
        res.status(200).json(object);
      })
      .catch(error => {
        return next(error);
      })
  });

  router.get('/api/knowledgeBase', requireAuth, function (req, res, next) {
    logger.log('info','Get knowledgeBase');
    var query = buildQuery(req.query, KnowledgeBase.find())
      .populate('personId', 'firstName lastName fullName')
    query.exec()
      .then(object => {
        res.status(200).json(object);
      })
      .catch(error => {
        return next(error);
      })
  });

  router.get('/api/knowledgeBase/:id', requireAuth, function (req, res, next) {
    logger.log('info','Get knowledgeBase');
    var query = KnowledgeBase.findById(req.params.id)
      .populate('personId', 'firstName lastName fullName')
    query.exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        return next(error);
      })
  });

  router.post('/api/knowledgeBase/', requireAuth, function (req, res, next) {
    logger.log('info','Create knowledgeBase', "verbose");
    var knowledgeBase = new KnowledgeBase(req.body);
    knowledgeBase.save()
      .then(object => {
        res.status(200).json(object);
      })
      .catch(error => {
        return next(error);
      })
  });

  router.put('/api/knowledgeBase/', requireAuth, function (req, res, next) {
    logger.log('info','Update knowledgeBase ' + req.body._id);
    KnowledgeBase.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true, safe: true, multi: false })
      .exec()
      .then(result => {
        var query = KnowledgeBase.findById(req.body.id)
          .populate('personId', 'firstName lastName fullName')
        query.exec()
          .then(result => {
            res.status(200).json(result);
          })
          .catch(error => {
            return next(error);
          })
      })
      .catch(error => {
        return next(error);
      })
  });

  router.delete('/api/knowledgeBase/:id', requireAuth, function (req, res, next) {
    logger.log('info','Delete knowledgeBase ' + req.params.id);
    KnowledgeBase.remove({ _id: req.params.id })
      .exec()
      .then(result => {
        res.status(204).json(result);
      })
      .catch(error => {
        return next(error);
      })
  });
};