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
}