const express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Inventory = mongoose.model('Inventory'),
    passport = require('passport'),
    logger = require('../../config/logger'),
    asyncHandler = require('express-async-handler');

const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
    app.use('/api', router);

    router.get('/inventory', asyncHandler(async (req, res) => {
        logger.log('info', 'Get inventory');
        var query = buildQuery(req.query, Inventory.find())
        query.exec().then(object => {
            res.status(200).json(object);
        })
    }));

    router.get('/inventory/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Get inventory ' + req.params.id);
        var query = Inventory.findById(req.params.id)
        query.exec().then(object => {
            res.status(200).json(object);
        })
    }));

    router.post('/inventory/', asyncHandler(async (req, res) => {
        logger.log('info', 'Create inventory');
        let inventory = new Inventory(req.body);
        inventory.save().then(result => {
            res.status(200).json(result);
        })
    }));

    router.put('/inventory', asyncHandler(async (req, res) => {
        logger.log('info', 'Update inventory ' + req.body._id);
        Inventory.findOneAndUpdate({ _id: req.body._id }, req.body, { safe: true, multi: false, new: true })
            .exec()
            .then(result => {
                res.status(200).json(object);
            })
    }));

    router.delete('/inventory/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Delete inventory [%s]', req.params.id);
        await Inventory.remove({ _id: req.params.id }).then(result => {
            res.status(200).json({ msg: "Inventory Deleted" });
        })
    }));
}