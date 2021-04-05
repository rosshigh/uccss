
var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  HelpTicket = mongoose.model('HelpTicket'),
  HelpTicketArchive = mongoose.model('HelpTicketArchive'),
  passport = require('passport'),
  logger = require('../../config/logger'),
  // ObjectId = require('mongodb').ObjectID,
  asyncHandler = require('express-async-handler');

var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
  app.use('/api', router);

  router.get('/helpTickets', asyncHandler(async (req, res) => {
    logger.log('info', 'Get helpTickets');
    var query = buildQuery(req.query, HelpTicket.find())
      .populate({ path: 'personId', model: 'Person', select: 'email firstName lastName fullName phone mobile nickName ' })
      .populate({ path: 'institutionId', model: 'Institution', select: 'name ' })
      .populate({ path: 'owner.personId', model: 'Person', select: 'firstName lastName fullName' })
    query.exec().then(object => {
      res.status(200).json(object);
    })
  }));

  router.get('/helpTickets/:id', asyncHandler(async (req, res) => {
    logger.log('info', 'Get helpTicket ' + req.params.id);
    var query = HelpTicket.findById(req.params.id)
      .populate({ path: 'personId', model: 'Person', select: 'email firstName lastName fullName phone mobile nickName file' })
      .populate({ path: 'institutionId', model: 'Institution', select: 'name ' })
      .populate({ path: 'owner.personId', model: 'Person', select: 'firstName lastName fullName' })
    query.exec().then(object => {
      res.status(200).json(object);
    })
  }));

  router.post('/helpTickets/', asyncHandler(async (req, res) => {
    logger.log('info', 'Create HelpTicket');
    let helpTicket = new HelpTicket(req.body);
    helpTicket.save().then(result => {
      res.status(200).json(result);
    })
  }));

  router.put('/helpTickets/close', asyncHandler(async (req, res) => {
    logger.log('info', 'Close HelpTicket ' + req.body._id);
    var archiveHT = new HelpTicketArchive(req.body);
    archiveHT.modifiedDate = new Date();
    archiveHT.save().then(result => {
      HelpTicket.remove({ _id: req.body._id }).then(result => {
        res.status(200).json(result);
      })
    })
  }));

  router.put('/helpTickets', asyncHandler(async (req, res) => {
    logger.log('info', 'Update HelpTicket ' + req.body._id);
    HelpTicket.findOneAndUpdate({ _id: req.body._id }, req.body, { safe: true, multi: false })
      .exec()
      .then(result => {
        HelpTicket.findOne({ _id: result._id })
          .populate({ path: 'personId', model: 'Person', select: 'email firstName lastName fullName phone mobile nickName ' })
          .populate({ path: 'institutionId', model: 'Institution', select: 'name ' })
          .populate({ path: 'owner.personId', model: 'Person', select: 'firstName lastName fullName' })
          .exec()
          .then(object => {
            res.status(200).json(object);
          })
      })
  }));

  router.post('/helpTickets/files/:content/:id', function (req, res, next) {
    HelpTicket.findById(req.params.id, function (err, helpticket) {
      const formidable = require('formidable');
      const form = formidable();
      form.maxFileSize = 800 * 1024 * 1024;
      form.parse(req);
      form.on('fileBegin', function (name, file) {
        let fileName = helpticket.helpTicketNo + '-' + req.params.content + '-' + file.name;
        file.path = config.uploads + '/helpTickets/' + fileName;
        helpticket.content[req.params.content].files.push(fileName);
      })

      form.on('file', function (name, file) {

      });

      form.on('end', function () {
        helpticket.markModified('content');
        helpticket.save().then(result => {
          res.status(201).json({ message: 'file uploaded' });
        })
      })
    })
  })

  // router.get('/helpTickets/archive', requireAuth, function (req, res, next) {
  //   logger.log('info', 'Get helpTicket');
  //   var query = buildQuery(req.query, HelpTicketArchive.find())
  //     .populate('courseId', 'name number')
  //     .populate('requestId')
  //     .populate('personId', 'email firstName lastName fullName phone mobile nickName file country')
  //     .populate('content.personId', 'email firstName lastName phone mobile nickName')
  //     .populate('institutionId', 'name')
  //     .populate({ path: 'owner.personId', model: 'Person', select: 'firstName lastName fullName' })
  //   query.exec()
  //     .then(object => {
  //       res.status(200).json(object);
  //     })
  //     .catch(error => {
  //       return next(error);
  //     })
  // });

  router.get('/helpTickets/archive/:id', function (req, res, next) {
    logger.log('info', 'Get help ticket ' + req.params.id);
    HelpTicketArchive.findOne({ _id: req.params.id })
      // .populate({ path: 'requestId', model: 'ClientRequest', populate: {path: 'institutionId', model: 'Institution', select: 'name'}})
      // .populate({path: 'requestId', model: 'ClientRequestDetails', populate: {path: 'requestId', model: 'ClientRequest', select: 'cousrseId'}})
      .populate('courseId', 'name number')
      .populate('requestId')
      .populate('personId', 'email firstName lastName phone mobile nickName file country')
      .populate('content.personId', 'email firstName lastName phone mobile nickName file')
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

  router.post('/helpTickets/archive', function (req, res, next) {
    logger.log('info', 'Archive search');
    var query = HelpTicketArchive.find();

    if (req.body.helpTicketNo) {
      query.where('helpTicketNo').equals(parseInt(req.body.helpTicketNo));
    } else {
      if (req.body.owner) {
        query.where('owner.personId').equals(req.body.owner);
      }
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
      // if (req.body.helpTicketType) {
      //   query.where('helpTicketType').equals(req.body.helpTicketType);
      // }
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
    query.populate({ path: 'owner.personId', model: 'Person', select: 'firstName lastName _id' })
    query.exec()
      .then(response => {
        if (response && response.length > 0) {
          if (req.body.content) {
            let searchTerm = req.body.content.toUpperCase();
            response = response.filter(item => {
              for (let i = 0; i < item.content.length; i++) {
                if (item.content[i].content && item.content[i].content.comments.toUpperCase().indexOf(searchTerm) > -1) {
                  return true;
                }
              }
              return false;
            });
          }
          console.log(response)
          res.status(200).json(response);
        } else {
          res.status(204).json({ message: "No documents found" });
        }
      })
      .catch(err => {
        return next(err);
      })
  });

  // router.post('/helpTickets/search', function (req, res, next) {
  //   logger.log('info', 'Search');
  //   var query = HelpTicket.find();

  //   if (req.body.helpTicketNo) {
  //     query.where('helpTicketNo').equals(parseInt(req.body.helpTicketNo));
  //   } else {
  //     if (req.body.owner) {
  //       query.where('owner.personId').equals(req.body.owner);
  //     }
  //     if (req.body.dateRange) {
  //       query.where('createdDate').gt(req.body.dateRange.dateFrom).lt(req.body.dateRange.dateTo);
  //     }
  //     if (req.body.status && req.body.status.length > 0) {
  //       query.in('helpTicketStatus', req.body.status);
  //     }
  //     if (req.body.keyWords) {
  //       let term = new RegExp(req.body.keyWords, "i")
  //       query.regex('keyWords', term);
  //     }
  //     if (req.body.peopleIds && req.body.peopleIds.length) {
  //       query.where('personId').in(req.body.peopleIds);
  //     }
  //     // if (req.body.productIds && req.body.productIds.length) {
  //     //   query.in('productId', req.body.productIds);
  //     // }
  //     // if (req.body.institutionIds && req.body.institutionIds.length) {
  //     //   query.in('institutionId', req.body.institutionIds);
  //     // }
  //   }
  //   query.populate('courseId', 'name number')
  //   query.populate('requestId')
  //   query.populate('personId', 'email firstName lastName phone mobile nickName file country')
  //   query.populate('content.personId', 'email firstName lastName phone mobile nickName')
  //   query.populate('institutionId', 'name')
  //   query.populate({ path: 'owner.personId', model: 'Person', select: 'firstName lastName _id' })
  //   query.exec()
  //     .then(response => {
  //       if (response && response.length > 0) {
  //         if (req.body.content) {
  //           let searchTerm = req.body.content.toUpperCase();
  //           response = response.filter(item => {
  //             let keep = false;
  //             for (let i = 0; i < item.content.length; i++) {
  //                 if (item.content[i].problemDescription.toUpperCase().indexOf(searchTerm) > -1) {
  //                   keep = true;
  //                 }
  //               }

  //               }
  //               if(item.content[0].requests && req.body.productIds && req.body.productIds.length){
  //                 if(req.body.productIds.indexOf(item.content[0].requests[0].productId) > -1){
  //                   keep = true;
  //                 }
  //               }
  //             return keep;
  //           });
  //         }

  //         res.status(200).json(response);
  //       } else {
  //         res.status(204).json({ message: "No documents found" });
  //       }
  //     })
  //     .catch(err => {
  //       return next(err);
  //     })
  // });

}