'use strict'

var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Person = mongoose.model('Person'),
    asyncHandler = require('express-async-handler'),
    // PersonArchive = mongoose.model('PersonArchive'),
    // Note = mongoose.model('Note'),
    // TechNote = mongoose.model('TechNote'),
    // TechNoteCategory = mongoose.model('TechNoteCategory'),
    http = require('http'),
    PasswordReset = mongoose.model('PasswordReset'),
    // path = require('path'),
    logger = require('../../config/logger'),
    // logAuth = require('../../config/log-authenticate'),
    passportService = require('../../config/passport'),
    passport = require('passport');
// Notifications =  mongoose.model('Notification'),
// Event = mongoose.model('Event'),
// EmailLog = mongoose.model('EmailLog'),
// multer = require('multer'),
// mkdirp = require('mkdirp'),
// DuplicateRecordError = require(path.join(__dirname, "../../config", "errors", "DuplicateRecordError.js"));


// var AsyncPolling = require('async-polling');

var requireAuth = passport.authenticate('jwt', { session: false }),
    requireLogin = passport.authenticate('local', { session: false });

module.exports = function (app, config) {
    app.use('/api', router);

    router.route('/people').get((req, res, next) => {
        logger.log('info', 'Get all people');
        var query = buildQuery(req.query, Person.find())
        query
            .select('lastName firstName fullName institutionId personStatus email phone roles country region')
            .populate({ path: 'institutionId', model: 'Institution', select: 'name' })
            .sort(req.query.order)
            .exec()
            .then(result => {
                if (result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ message: "No users" });
                }
            }).catch(err => { return next(err); });
    });

    router.get('/people/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Get person [%s]', req.params.id, 'verbose');
        await Person.findById(req.params.id).then(result => {
            res.status(200).json(result);
        })
    }));

    router.post('/api/people', asyncHandler(async (req, res) => {
        logger.log('info','Create Person');
        var person =  new Person(req.body);  
          person.save().then(result => {
            res.status(200).json(result);
        })
    }));

    router.put('/people', asyncHandler(async (req, res) => {
        logger.log('info', 'Update Person ' + req.body._id);
        await Person.findOneAndUpdate({ _id: req.body._id }, req.body, { safe: true, multi: false }).then(result => {
            res.status(200).json(result);
        })
    }));

    router.put('/people/password/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Update Person password [%s]', req.params.id);
        await Person.findById(req.params.id).then(result => {
            result.password = req.body.password;
            result.save(function (err, person) {
                if (err) {
                    return next(err);
                } else {
                    res.status(200).json(person);
                }
            });
        })
    }));

    router.delete('/people/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Delete person [%s]', req.params.id, 'verbose');
        await Person.remove({ _id: req.params.id }).then(result => {
            res.status(200).json({ msg: "Person Deleted" });
        })
    }));

    router.route('/users/login')
        .post(requireLogin, login);

    router.route('/users/logout').post(function (req, res, next) {
        logger.log('info', 'logoff-' + req.body.email, 'info');
        res.status(201).json({ message: "logout successful" });
    })

};