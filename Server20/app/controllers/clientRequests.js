var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  ClientRequests = mongoose.model('ClientRequest'),
  ClientRequestDetail = mongoose.model('ClientRequestDetail'),
  System = mongoose.model('System'),
  Assignment = mongoose.model('Assignment'),
  Course = mongoose.model('Course'),
  Person = mongoose.model('Person'),
  Product = mongoose.model('Product'),
  Session = mongoose.model('Session'),
  passport = require('passport'),
  Promise = require('bluebird'),
  ClientRequestLock = mongoose.model('ClientRequestLock'),
  logger = require('../../config/logger'),
  EmailLog = mongoose.model('EmailLog'),
  ObjectId = require('mongodb').ObjectID,
  asyncHandler = require('express-async-handler');

var requireAuth = passport.authenticate('jwt', { session: false });

var ASSIGNED_REQUEST_CODE = '2';
var CUSTOMER_ACTION_REQUEST_CODE = "4";

module.exports = function (app) {
  app.use('/api', router);

  router.get('/clientRequests', asyncHandler(async (req, res) => {
    logger.log('info', 'Get clientRequests');
    var query = buildQuery(req.query, ClientRequests.find());
    query.sort(req.query.order)
      .populate({ path: 'requestDetails', model: 'ClientRequestDetail' })
      .populate({ path: 'personId', model: 'Person', select: 'firstName lastName fullName nickName phone ext mobile email institutionId file country' })
      .populate({ path: 'courseId', model: 'Course', select: 'number name' })
    query.exec()
      .then(object => {
        res.status(200).json(object);
      })
  }));

  router.get('/clientRequests/:id/:sessions', asyncHandler(async (req, res) => {
    logger.log('info', 'Get customers active clientRequests');
    var activeSessions = req.params.sessions.split(":");
    for (let i = 0; i < activeSessions.length; i++) {
      activeSessions[i] = ObjectId(activeSessions[i]);
    }
    ClientRequests.find()
      .where('personId').eq(req.params.id)
      .where('sessionId').in(activeSessions)
      .sort(req.query.order)
      .populate({ path: 'requestDetails', model: 'ClientRequestDetail' })
      .populate({ path: 'courseId', model: 'Course', select: 'number name' })
      .populate({ path: 'requestDetails', model: 'ClientRequestDetail', populate: { path: 'productId', model: 'Product', select: 'name' } })
      .exec()
      .then(object => {
        res.status(200).json(object);
      })
  }));

  router.post('/clientRequests', asyncHandler(async (req, res) => {
    logger.log('info', 'Create clientRequest');
    var clientRequest = new ClientRequests(req.body);
    var tasks = new Array();
    req.body.requestDetailsToSave.forEach(detail => {
      var obj = new ClientRequestDetail(detail);
      obj.requestId = clientRequest._id;
      clientRequest.requestDetails.push(obj._id);
      tasks.push(ClientRequestDetail.create(obj));
    });

    Promise.all(tasks)
      .then(results => {
        clientRequest.save().then(result => {
          res.status(200).json(result);
        })
      })
  }));

  router.get('/clientRequestsDetails', asyncHandler(async (req, res) => {
    logger.log('info', 'Get clientRequests');
    var query = buildQuery(req.query, ClientRequestDetail.find());
    query
      .select('requestStatus requiredDate createdDate requestId productId assignments.systemId assignments.client')
      .populate({ path: 'requestId', model: 'ClientRequest', populate: { path: 'personId', model: 'Person', select: 'firstName lastName fullName nickName phone mobile ext email institutionId file country' } })
      .populate({ path: 'requestId', model: 'ClientRequest', populate: { path: 'institutionId', model: 'Institution', select: 'name apj' } })
      .populate({ path: 'requestId', model: 'ClientRequest', populate: { path: 'courseId', model: 'Course', select: 'number name' } })
      .populate({ path: "productId", model: "Product", select: "name" })
      .populate({ path: 'assignments.systemId', model: "System", select: "sid" })
      .exec()
      .then(object => {
        if (object) {
          res.status(200).json(object);
        } else {
          res.status(404).json({ message: "No requests were found" });
        }
      })
  }));

  router.get('/clientRequestsDetails/:id', asyncHandler(async (req, res) => {
    logger.log('info', 'Get clientRequest');
    ClientRequestDetail.findById(req.params.id)
      .select('requestStatus requiredDate createdDate requestId productId assignments assignments techComments documents')
      .populate({ path: 'requestId', model: 'ClientRequest', populate: { path: 'personId', model: 'Person', select: 'firstName lastName fullName nickName phone mobile ext email institutionId file country' } })
      .populate({ path: 'requestId', model: 'ClientRequest', populate: { path: 'institutionId', model: 'Institution', select: 'name apj' } })
      .populate({ path: 'requestId', model: 'ClientRequest', populate: { path: 'courseId', model: 'Course', select: 'number name' } })
      .populate({ path: "productId", model: "Product", select: "name systems defaultStudentIdPrefix firstAllowableId defaultFacultyIdPrefix" })
      .exec()
      .then(object => {
        if (object) {
          res.status(200).json(object);
        } else {
          res.status(404).json({ message: "No requests were found" });
        }
      })
  }));

  router.post('/clientRequestsDetails/clone', asyncHandler(async (req, res) => {
    logger.log('info', 'Clone request detail');
    if (req.body && req.body.requestId) {
      ClientRequests.findById(req.body.requestId)
        .then(request => {
          let detail = new ClientRequestDetail(req.body);
          detail.save().then(result => {
            request.requestDetails.push(detail._id);
            request.save(request).then(newRequest => {
              ClientRequestDetail.findById(result._id)
                .select('requestStatus requiredDate createdDate requestId productId assignments.systemId assignments.client')
                .populate({ path: 'requestId', model: 'ClientRequest', populate: { path: 'personId', model: 'Person', select: 'firstName lastName fullName nickName phone mobile ext email institutionId file country' } })
                .populate({ path: 'requestId', model: 'ClientRequest', populate: { path: 'institutionId', model: 'Institution', select: 'name' } })
                .populate({ path: 'requestId', model: 'ClientRequest', populate: { path: 'courseId', model: 'Course', select: 'number name' } })
                .populate({ path: "productId", model: "Product", select: "name" })
                .exec().then(newDetail => {
                  res.status(200).json(newDetail);
                })
            })
          })
        })

    } else {
      res.status(400).json('Bad Request');
    }
  }));

  router.put('/clientRequestsDetails', asyncHandler(async (req, res) => {
    logger.log('info', 'Update Request Detail ' + req.body._id);
    ClientRequestDetail.findOneAndUpdate({ _id: req.body._id }, req.body, { safe: true, multi: false }).then(result => {
      ClientRequestDetail.findById(result._id)
        .select('requestStatus requiredDate createdDate requestId productId assignments assignments')
        .populate({ path: 'requestId', model: 'ClientRequest', populate: { path: 'personId', model: 'Person', select: 'firstName lastName fullName nickName phone mobile ext email institutionId file country' } })
        .populate({ path: 'requestId', model: 'ClientRequest', populate: { path: 'institutionId', model: 'Institution', select: 'name' } })
        .populate({ path: 'requestId', model: 'ClientRequest', populate: { path: 'courseId', model: 'Course', select: 'number name' } })
        .populate({ path: "productId", model: "Product", select: "name systems defaultStudentIdPrefix firstAllowableId defaultFacultyIdPrefix" })
        .exec()
        .then(object => {
          res.status(200).json(object);
        });
    });
  }));

  router.delete('/clientRequestsDetails/:id/:requestid', asyncHandler(async (req, res) => {
    logger.log('info', 'Delete request [%s]', req.params.id, 'verbose');
    await ClientRequestDetail.deleteOne({ _id: req.params.id }).then(result => {
      ClientRequests.findById(req.params.requestid).then(request => {
        if (request && request.requestDetails && request.requestDetails.length > 0) {
          request.requestDetails.splice(request.requestDetails.indexOf(req.params.id), 1);
          if (request.requestDetails.length === 0) {
            ClientRequests.findOneAndRemove({ _id: request._id })
          } else {
            request.save();
          }
        }
        res.status(204).json('Detail deleted');
      });
    })
  }));
}