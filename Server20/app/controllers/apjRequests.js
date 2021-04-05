var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    ClientRequest = mongoose.model('ClientRequestAPJ'),
    ClientRequestDetail = mongoose.model('ClientRequestDetailAPJ'),
    System = mongoose.model('System'),
    Package = mongoose.model('Packages'),
    passport = require('passport'),
    logger = require('../../config/logger'),
    asyncHandler = require('express-async-handler');

var requireAuth = passport.authenticate('jwt', { session: false });


module.exports = function (app, config) {
    app.use('/api/apj', router);

    router.get('/packages', asyncHandler(async (req, res) => {
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
    }));

    router.get('/packages/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Get packages');
        ClientRequestDetail.findById(req.params.id)
            .exec()
            .then(object => {
                if (object) {
                    res.status(200).json(object);
                } else {
                    res.status(200).json({ message: "No Packages were found" });
                }
            })
    }));

    router.post('/packages', asyncHandler(async (req, res) => {
        logger.log('info', 'Create packages');
        var package = new Package(req.body);
        package.save(function (err, object) {
            if (err) {
                return next(err);
            } else {
                res.status(200).json(object);
            }
        });
    }));

    router.put('/packages', asyncHandler(async (req, res) => {
        logger.log('info', 'Update packages ' + req.body._id);
        Package.findOneAndUpdate({ _id: req.body._id }, req.body, { safe: true, multi: false })
            .exec()
            .then(result => {
                res.status(200).json(result);
            })
    }));

    router.get('/clientRequests', asyncHandler(async (req, res) => {
        logger.log('info', 'Get clientRequests');
        var query = buildQuery(req.query, ClientRequest.find());
        query.sort(req.query.order)
            .populate({ path: 'requestDetails', model: 'ClientRequestDetailAPJ' })
            //   .populate({ path: 'personId', model: 'Person', select: 'firstName lastName fullName nickName phone ext mobile email institutionId file country' })
            .exec()
            .then(object => {
                if (object) {
                    res.status(200).json(object);
                } else {
                    res.status(200).json({ message: "No requests were found" });
                }
            })
    }));

    router.post('/clientRequests', asyncHandler(async (req, res) => {
        logger.log('info', 'Create clientRequest');

        var clientRequest = new ClientRequest(req.body.request);
        var tasks = new Array();

        clientRequest.requestDetails = new Array();
        req.body.newDetailsToSave.forEach(detail => {
            var obj = new ClientRequestDetail(detail);
            obj.requestId = clientRequest._id;
            clientRequest.requestDetails.push(obj._id);
            tasks.push(ClientRequestDetail.create(obj));
        });
        req.body.detailsToSave.forEach(detail => {
            tasks.push(ClientRequestDetail.findOneAndUpdate({ _id: detail._id }, detail, { safe: true, multi: false }));
        })

        Promise.all(tasks)
            .then(results => {
                clientRequest.save().then(result => {
                    res.status(200).json(result);
                })
            })
    }));

    router.put('/clientRequests', asyncHandler(async (req, res) => {
        logger.log('info', 'Update clientRequest');

        var tasks = new Array();

        req.body.newDetailsToSave.forEach(detail => {
            var obj = new ClientRequestDetail(detail);
            obj.requestId = req.body.request._id;
            req.body.request.requestDetails.push(obj._id);
            tasks.push(ClientRequestDetail.create(obj));
        });
        req.body.detailsToSave.forEach(detail => {
            tasks.push(ClientRequestDetail.findOneAndUpdate({ _id: detail._id }, detail, { safe: true, multi: false }));
        })

        Promise.all(tasks)
            .then(results => {
                ClientRequest.findOneAndUpdate({ _id: req.body.request._id }, req.body.request, { safe: true, multi: false }).then(result => {
                    res.status(200).json(result);
                })
            })
    }));

    router.get('/clientRequestsDetails', asyncHandler(async (req, res) => {
        logger.log('info', 'Get clientRequests');
        var query = buildQuery(req.query, ClientRequestDetail.find());
        query
            .select('requestStatus price requiredDate createdDate numberOfStudents requestId productId assignments.systemId assignments.client')
            .populate({ path: 'requestId', model: 'ClientRequestAPJ', populate: { path: 'personId', model: 'Person', select: 'firstName lastName fullName nickName phone mobile ext email institutionId file country' } })
            .populate({ path: 'requestId', model: 'ClientRequestAPJ', populate: { path: 'institutionId', model: 'Institution', select: 'name' } })
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

    router.put('/clientRequestsDetails', asyncHandler(async (req, res) => {
        logger.log('info', 'Update request detail');

        ClientRequestDetail.findOneAndUpdate({ _id: req.body._id }, req.body).then(requestDetail => {
            ClientRequestDetail.findById(requestDetail._id)
                .populate({ path: 'requestId', model: 'ClientRequestAPJ', populate: { path: 'personId', model: 'Person', select: 'firstName lastName fullName nickName phone mobile email institutionId file country' } })
                .populate({ path: 'requestId', model: 'ClientRequestAPJ', populate: { path: 'institutionId', model: 'Institution', select: 'name' } })
                .populate({ path: "productId", model: "Product", select: "name" })
                .populate({ path: 'assignments.systemId', model: "System", select: "sid" })
                .exec()
                .then(object => {
                    if (object) {
                        res.status(200).json(object);
                    } else {
                        res.status(404).json({ message: "No request was found" });
                    }
                })
        })
    }));

    router.get('/clientRequestsDetails/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Get clientRequests');

        ClientRequestDetail.findById(req.params.id)
            .populate({ path: 'requestId', model: 'ClientRequestAPJ', populate: { path: 'personId', model: 'Person', select: 'firstName lastName fullName nickName phone mobile email institutionId file country' } })
            .populate({ path: 'requestId', model: 'ClientRequestAPJ', populate: { path: 'institutionId', model: 'Institution', select: 'name' } })
            .populate({ path: "productId", model: "Product", select: "name systems" })
            .exec()
            .then(object => {
                if (object) {
                    res.status(200).json(object);
                } else {
                    res.status(404).json({ message: 'No object was found' })
                }
            })
    }));

    router.get('/systems/product/:systems', asyncHandler(async (req, res) => {
        logger.log('info', 'Getting product systems');
        var productSystems = req.params.systems.split(':');
        await System.find({ $and: [{ sid: { $in: productSystems } }, { apj: true }] })
            .populate({ path: 'clients.assignments.assignment', model: 'ClientRequestDetailAPJ' })
            .populate({ path: 'clients.assignments.personId', model: 'Person', select: 'firstName lastName fullName' })
            .exec().then(result => {
                res.status(200).json(result);
            })
    }));

}